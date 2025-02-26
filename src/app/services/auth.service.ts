import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, from, of, switchMap } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  role: 'developer' | 'leader' | 'user';
  groupId?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = user(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserData(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return credential.user;
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    role: 'developer' | 'leader' | 'user',
    groupId?: string,
    displayName?: string
  ) {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.setUserData(credential.user.uid, {
        uid: credential.user.uid,
        email,
        role,
        groupId,
        displayName: displayName || email,
      });
      return credential.user;
    } catch (error) {
      console.error('登録エラー:', error);
      throw error;
    }
  }

  async logout() {
    return signOut(this.auth);
  }

  private getUserData(uid: string): Observable<User | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userRef)).pipe(
      switchMap((docSnap) => {
        if (docSnap.exists()) {
          return of(docSnap.data() as User);
        } else {
          return of(null);
        }
      })
    );
  }

  private async setUserData(uid: string, user: User) {
    const userRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userRef, user);
  }

  // 現在のユーザーが開発者かどうかをチェック
  isDeveloper(user: User | null): boolean {
    // トークンのカスタムクレームを使用
    return !!user && user.role === 'developer';
  }

  // 現在のユーザーが特定グループのリーダーかどうかをチェック
  isGroupLeader(user: User | null, groupId: string): boolean {
    // トークンのカスタムクレームを使用
    return !!user && user.role === 'leader' && user.groupId === groupId;
  }

  // 現在のユーザーが特定グループのメンバーかどうかをチェック
  isGroupMember(user: User | null, groupId: string): boolean {
    // トークンのカスタムクレームを使用
    return !!user && user.groupId === groupId;
  }
}
