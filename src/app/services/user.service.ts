import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  // ユーザーの取得
  getUser(userId: string): Observable<User | null> {
    const userRef = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data() as User;
        } else {
          return null;
        }
      })
    );
  }

  // 全ユーザーの取得（開発者用）
  getAllUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return from(getDocs(usersRef)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => doc.data() as User);
      })
    );
  }

  // グループに属するユーザーの取得（リーダー用）
  getUsersByGroup(groupId: string): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('groupId', '==', groupId));
    return from(getDocs(q)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => doc.data() as User);
      })
    );
  }

  // ユーザーの更新
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(this.firestore, `users/${userId}`);
    return updateDoc(userRef, userData);
  }

  // ユーザーの削除
  async deleteUser(userId: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${userId}`);
    return deleteDoc(userRef);
  }
}
