import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role?: string;
}

interface Team {
  id?: string;
  name: string;
  leaderId: string;
  members: User[];
  createdAt: Date;
}

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss',
})
export class Page3Component implements OnInit {
  user: User | null = null;
  teams: Team[] = [];
  currentTeam: Team | null = null;
  newTeamName: string = '';
  inviteEmail: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private auth: Auth, private firestore: Firestore) {}

  ngOnInit(): void {
    // ユーザー認証状態の監視を設定
    user(this.auth).subscribe(async (firebaseUser) => {
      this.loading = true;
      if (firebaseUser) {
        // ユーザーがログインしている場合
        this.user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'ユーザー',
          photoURL: firebaseUser.photoURL || '',
        };
        await this.loadUserTeams();
      } else {
        // ユーザーがログインしていない場合
        this.user = null;
        this.teams = [];
        this.currentTeam = null;
      }
      this.loading = false;
    });
  }

  async login() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('ログインエラー:', error);
      this.error = 'ログインに失敗しました。もう一度お試しください。';
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
      this.error = 'ログアウトに失敗しました。';
    }
  }

  async loadUserTeams() {
    if (!this.user) return;

    try {
      // ユーザーがリーダーのチームを取得
      const teamsRef = collection(this.firestore, 'teams');
      const leaderQuery = query(
        teamsRef,
        where('leaderId', '==', this.user.uid)
      );
      const leaderSnapshot = await getDocs(leaderQuery);

      // ユーザーがメンバーのチームを取得
      const memberQuery = query(
        teamsRef,
        where('members', 'array-contains', {
          uid: this.user.uid,
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
        })
      );
      const memberSnapshot = await getDocs(memberQuery);

      this.teams = [];

      leaderSnapshot.forEach((doc) => {
        this.teams.push({ id: doc.id, ...(doc.data() as Omit<Team, 'id'>) });
      });

      memberSnapshot.forEach((doc) => {
        // 重複を避ける
        if (!this.teams.some((team) => team.id === doc.id)) {
          this.teams.push({ id: doc.id, ...(doc.data() as Omit<Team, 'id'>) });
        }
      });

      if (this.teams.length > 0) {
        this.selectTeam(this.teams[0]);
      } else {
        // チームがない場合は現在のチームをnullに設定
        this.currentTeam = null;
      }
    } catch (error) {
      console.error('チーム読み込みエラー:', error);
      this.error = 'チームの読み込みに失敗しました。';
    } finally {
      // 読み込み状態を終了
      this.loading = false;
    }
  }

  selectTeam(team: Team) {
    this.currentTeam = team;
  }

  async createTeam() {
    if (!this.user || !this.newTeamName.trim()) return;

    try {
      const newTeam: Omit<Team, 'id'> = {
        name: this.newTeamName.trim(),
        leaderId: this.user.uid,
        members: [this.user],
        createdAt: new Date(),
      };

      const teamsRef = collection(this.firestore, 'teams');
      const docRef = await addDoc(teamsRef, newTeam);

      const createdTeam: Team = {
        ...newTeam,
        id: docRef.id,
      };

      this.teams.push(createdTeam);
      this.currentTeam = createdTeam;
      this.newTeamName = '';
    } catch (error) {
      console.error('チーム作成エラー:', error);
      this.error = 'チームの作成に失敗しました。';
    }
  }

  async inviteMember() {
    if (!this.currentTeam || !this.inviteEmail.trim()) return;

    try {
      // メールアドレスからユーザーを検索
      const usersRef = collection(this.firestore, 'users');
      const userQuery = query(
        usersRef,
        where('email', '==', this.inviteEmail.trim())
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        this.error = 'ユーザーが見つかりませんでした。';
        return;
      }

      const userData = userSnapshot.docs[0].data() as User;

      // すでにメンバーかチェック
      if (
        this.currentTeam.members.some((member) => member.uid === userData.uid)
      ) {
        this.error = 'このユーザーはすでにチームのメンバーです。';
        return;
      }

      // メンバーを追加
      const teamRef = doc(this.firestore, 'teams', this.currentTeam.id!);
      await updateDoc(teamRef, {
        members: arrayUnion(userData),
      });

      // ローカルの状態を更新
      this.currentTeam.members.push(userData);
      this.inviteEmail = '';
      this.error = '';
    } catch (error) {
      console.error('招待エラー:', error);
      this.error = 'メンバーの招待に失敗しました。';
    }
  }

  async removeMember(userId: string) {
    if (
      !this.currentTeam ||
      !this.user ||
      this.currentTeam.leaderId !== this.user.uid
    )
      return;

    try {
      const memberToRemove = this.currentTeam.members.find(
        (member) => member.uid === userId
      );
      if (!memberToRemove) return;

      const teamRef = doc(this.firestore, 'teams', this.currentTeam.id!);
      await updateDoc(teamRef, {
        members: arrayRemove(memberToRemove),
      });

      // ローカルの状態を更新
      this.currentTeam.members = this.currentTeam.members.filter(
        (member) => member.uid !== userId
      );
    } catch (error) {
      console.error('メンバー削除エラー:', error);
      this.error = 'メンバーの削除に失敗しました。';
    }
  }

  isTeamLeader(): boolean {
    return (
      this.user !== null &&
      this.currentTeam !== null &&
      this.user.uid === this.currentTeam.leaderId
    );
  }
}
