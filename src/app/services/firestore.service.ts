import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  QuerySnapshot,
  DocumentData,
  Timestamp,
} from '@angular/fire/firestore';

export interface EventRecord {
  id?: string;
  date: Date;
  investment: number;
  recovery: number;
  storeName: string;
  eventType: string;
  timestamp?: Date;
}

// Firestoreから取得したデータの型
interface FirestoreEventRecord {
  id?: string;
  date: Date | Timestamp;
  investment: number;
  recovery: number;
  storeName: string;
  eventType: string;
  timestamp?: Date | Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async saveCounterHistory(data: any): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(this.firestore, 'counter-history'),
        {
          ...data,
          timestamp: new Date(),
        }
      );
      return docRef.id;
    } catch (error) {
      console.error('Error saving counter history:', error);
      throw error;
    }
  }

  async saveShushiRecord(data: EventRecord): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'shushi'), {
        ...data,
        timestamp: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving shushi record:', error);
      throw error;
    }
  }

  async getShushiRecords(): Promise<EventRecord[]> {
    try {
      const q = query(
        collection(this.firestore, 'shushi'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return this.processQuerySnapshot(querySnapshot);
    } catch (error) {
      console.error('Error getting shushi records:', error);
      throw error;
    }
  }

  private processQuerySnapshot(
    querySnapshot: QuerySnapshot<DocumentData>
  ): EventRecord[] {
    const records: EventRecord[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreEventRecord;

      // FirestoreのタイムスタンプをネイティブのDateオブジェクトに変換
      records.push({
        ...data,
        id: doc.id,
        date: this.convertToDate(data.date),
        timestamp: data.timestamp
          ? this.convertToDate(data.timestamp)
          : undefined,
      });
    });
    return records;
  }

  // TimestampまたはDateをDateに変換するヘルパーメソッド
  private convertToDate(dateOrTimestamp: Date | Timestamp | unknown): Date {
    if (dateOrTimestamp instanceof Date) {
      return dateOrTimestamp;
    }

    // Firestoreのタイムスタンプオブジェクトの場合
    if (
      dateOrTimestamp &&
      typeof (dateOrTimestamp as any).toDate === 'function'
    ) {
      return (dateOrTimestamp as any).toDate();
    }

    // それ以外の場合は現在の日時を返す
    return new Date();
  }
}
