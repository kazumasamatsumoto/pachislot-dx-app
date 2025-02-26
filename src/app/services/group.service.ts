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
import { AuthService } from './auth.service';

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // グループの作成
  async createGroup(
    groupData: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const groupsRef = collection(this.firestore, 'groups');
    const newGroupRef = doc(groupsRef);
    const now = new Date();

    const newGroup: Group = {
      id: newGroupRef.id,
      ...groupData,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(newGroupRef, newGroup);
    return newGroupRef.id;
  }

  // グループの取得
  getGroup(groupId: string): Observable<Group | null> {
    const groupRef = doc(this.firestore, `groups/${groupId}`);
    return from(getDoc(groupRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() } as Group;
        } else {
          return null;
        }
      })
    );
  }

  // 全グループの取得（開発者用）
  getAllGroups(): Observable<Group[]> {
    const groupsRef = collection(this.firestore, 'groups');
    return from(getDocs(groupsRef)).pipe(
      map((snapshot) => {
        return snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Group)
        );
      })
    );
  }

  // グループの更新
  async updateGroup(
    groupId: string,
    groupData: Partial<Omit<Group, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> {
    const groupRef = doc(this.firestore, `groups/${groupId}`);
    const updateData = {
      ...groupData,
      updatedAt: new Date(),
    };
    return updateDoc(groupRef, updateData);
  }

  // グループの削除
  async deleteGroup(groupId: string): Promise<void> {
    const groupRef = doc(this.firestore, `groups/${groupId}`);
    return deleteDoc(groupRef);
  }
}
