import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuthModule,
  AngularFireAuth,
} from '@angular/fire/compat/auth';
import {
  AngularFirestoreModule,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
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

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        };
        this.loadUserTeams();
      } else {
        this.user = null;
        this.teams = [];
        this.currentTeam = null;
      }
      this.loading = false;
    });
  }

  async login() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.auth.signInWithPopup(provider);
    } catch (error) {
      console.error('ログインエラー:', error);
      this.error = 'ログインに失敗しました。もう一度お試しください。';
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('ログアウトエラー:', error);
      this.error = 'ログアウトに失敗しました。';
    }
  }

  async loadUserTeams() {
    if (!this.user) return;

    try {
      // ユーザーがリーダーのチームを取得
      const leaderTeamsSnapshot = await this.firestore
        .collection<Team>('teams', (ref) =>
          ref.where('leaderId', '==', this.user?.uid)
        )
        .get()
        .toPromise();

      // ユーザーがメンバーのチームを取得
      const memberTeamsSnapshot = await this.firestore
        .collection<Team>('teams', (ref) =>
          ref.where('members', 'array-contains', {
            uid: this.user?.uid,
            email: this.user?.email,
            displayName: this.user?.displayName,
            photoURL: this.user?.photoURL,
          })
        )
        .get()
        .toPromise();

      this.teams = [];

      leaderTeamsSnapshot?.forEach((doc) => {
        this.teams.push({ id: doc.id, ...doc.data() });
      });

      memberTeamsSnapshot?.forEach((doc) => {
        // 重複を避ける
        if (!this.teams.some((team) => team.id === doc.id)) {
          this.teams.push({ id: doc.id, ...doc.data() });
        }
      });

      if (this.teams.length > 0) {
        this.selectTeam(this.teams[0]);
      }
    } catch (error) {
      console.error('チーム読み込みエラー:', error);
      this.error = 'チームの読み込みに失敗しました。';
    }
  }

  selectTeam(team: Team) {
    this.currentTeam = team;
  }

  async createTeam() {
    if (!this.user || !this.newTeamName.trim()) return;

    try {
      const newTeam: Team = {
        name: this.newTeamName.trim(),
        leaderId: this.user.uid,
        members: [this.user],
        createdAt: new Date(),
      };

      const docRef = await this.firestore.collection('teams').add(newTeam);
      newTeam.id = docRef.id;

      this.teams.push(newTeam);
      this.currentTeam = newTeam;
      this.newTeamName = '';
    } catch (error) {
      console.error('チーム作成エラー:', error);
      this.error = 'チームの作成に失敗しました。';
    }
  }

  async inviteMember() {
    if (!this.currentTeam || !this.inviteEmail.trim()) return;

    try {
      // メールアドレスからユーザーを検索（実際の実装ではセキュリティルールの設定が必要）
      const userSnapshot = await this.firestore
        .collection('users', (ref) =>
          ref.where('email', '==', this.inviteEmail.trim())
        )
        .get()
        .toPromise();

      if (userSnapshot?.empty) {
        this.error = 'ユーザーが見つかりませんでした。';
        return;
      }

      const userData = userSnapshot?.docs[0].data() as User;

      // すでにメンバーかチェック
      if (
        this.currentTeam.members.some((member) => member.uid === userData.uid)
      ) {
        this.error = 'このユーザーはすでにチームのメンバーです。';
        return;
      }

      // メンバーを追加
      await this.firestore
        .collection('teams')
        .doc(this.currentTeam.id)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion(userData),
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

      await this.firestore
        .collection('teams')
        .doc(this.currentTeam.id)
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(memberToRemove),
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
