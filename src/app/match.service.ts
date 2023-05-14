import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private firestore: AngularFirestore) {}


  getMatches() {
    return this.firestore.collection('matchs').valueChanges({ idField: 'id' });
  }


  getMatch(id: string) {
    return this.firestore.collection('matchs').doc(id).snapshotChanges();
  }

  createMatch(match: any) {
    return this.firestore.collection('matchs').add(match);
  }

  updateMatch(id: string, match: any) {
    return this.firestore.collection('matchs').doc(id).update(match);
  }

  deleteMatch(id: string) {
    return this.firestore.collection('matchs').doc(id).delete();
  }

  addPlayerToMatch(matchId: string, playerId: string) {
    return this.firestore
      .collection('matchs')
      .doc(matchId)
      .update({ joueurs: firebase.firestore.FieldValue.arrayUnion(playerId) });
  }

  removePlayerFromMatch(matchId: string, playerId: string) {
    return this.firestore
      .collection('matchs')
      .doc(matchId)
      .update({ joueurs: firebase.firestore.FieldValue.arrayRemove(playerId) });
  }
}
