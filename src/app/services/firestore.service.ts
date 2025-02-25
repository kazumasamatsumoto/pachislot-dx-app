import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
}
