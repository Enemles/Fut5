import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, query, onSnapshot, getDocs } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore = getFirestore();
  getMatchList(): Observable<any> {
    return from(getDocs(collection(this.firestore, 'matches')));
  }
  getMatchDetails(matchId: number): Observable<any> {
    return from(getDocs(collection(this.firestore, `matches/${matchId}`)));
  }

}
