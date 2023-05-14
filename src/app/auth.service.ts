import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {BehaviorSubject, map, Observable} from "rxjs";
import firebase from "firebase/compat";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      this.isAuthenticated$.next(user !== null);
    });
  }

// Méthode de connexion
  async login(email: string, password: string): Promise<boolean> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

// Méthode d'inscription
  async register(
    email: string,
    password: string,
    nom: string,
    prenom: string,
    dateNaissance: string
  ): Promise<boolean> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: prenom + ' ' + nom,
        });
        await this.firestore.collection('users').doc(user.uid).set({
          nom,
          prenom,
          email,
          dateNaissance,
          stats: {
            nbButs: 0,
            vitesse: 0,
            physique: 0,
            dribble: 0,
            tir: 0,
            defense: 0,
            passe: 0,
            nbFoisMVP: 0,
            nbFoisGuezMan: 0,
            matchs: [],
          },
        });
      }
      await this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          };
        } else {
          return null;
        }
      })
    );
  }


}
