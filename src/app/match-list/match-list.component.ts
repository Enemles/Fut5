import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Firestore } from '@angular/fire/firestore';
import { ModalMatchComponent } from '../modal-match/modal-match.component';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
  matches: any[] = [];
  currentUser: any;
  selectedMatch: any;
  isRegistered: boolean = false;


  // Données mockées pour les matchs
  mockedMatches: any[] = [
    {
      id: '1',
      name: 'Match 1',
      equipe1 : "Equipe 1",
      equipe2 : "Equipe 2",
      date: "2023-05-10",
      heure: "10:00",
      joueurs: [
        { uid: '123', prenom: 'Thomas' , status: 'confirmed' },
        { uid: '456', prenom: 'Lucas' , status: 'pending' },
        { uid: '456', prenom: 'Jules' , status: 'pending' },
      ],
    },
    {
      id: '2',
      name: 'Match 2',
      equipe1 : "Equipe 1",
      equipe2 : "Equipe 2",
      date: "2023-05-10",
      heure: "10:00",
      joueurs: [
        { uid: '789',prenom: 'Selmène' , status: 'confirmed' },
        { uid: '123', prenom: 'Simon' , status: 'confirmed' },
      ],
    },
  ];

  @ViewChild(ModalMatchComponent, { static: false })
  modal: ModalMatchComponent;

  constructor(
    private matchService: MatchService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  getStatus(match: any): string | boolean | null {
    const currentUserInMatch = this.isCurrentUser(match);
    return currentUserInMatch ? currentUserInMatch.status : null;
  }

  isCurrentUser(match: any): any {
    if (!this.currentUser || !match || !match.players) {
      return null;
    }
    return match.players.find(
      (player: any) => player.uid === this.currentUser.uid
    );
  }
  openModal(match: any) {
    this.selectedMatch = match;
    this.modal.showModal();
  }

  changeStatus(player: any, newStatus: string) {
    player.status = newStatus;
  }

  getMatches() {
    // Remplacez la ligne suivante par celle ci-dessous pour utiliser les données du service
    // this.matchService.getMatches().subscribe((matches) => {
    //   this.matches = matches;
    // });
    this.matches = this.mockedMatches;
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
  registerForMatch(matchId: string) {
    if (this.currentUser) {
      const match = this.matches.find((m) => m.id === matchId);

      // Vérifie si l'utilisateur actuel est déjà inscrit
      const isAlreadyRegistered = match.joueurs.some(
        (player) => player.uid === this.currentUser.uid
      );

      if (!isAlreadyRegistered) {
        match.joueurs.push({
          uid: this.currentUser.uid,
          prenom: this.currentUser.displayName,
          status: 'pending',
        });
        this.isRegistered = true;
        console.log('Inscrit avec succès au match');
      } else {
        console.log('Vous êtes déjà inscrit à ce match');
      }
    } else {
      console.log('Vous devez être connecté pour vous inscrire à un match');
    }
  }

  isUserRegisteredForMatch(match: any): boolean {
    if (!this.currentUser || !match || !match.joueurs) {
      return false;
    }
    return match.joueurs.some(
      (player) => player.uid === this.currentUser.uid
    );
  }


  unregisterFromMatch(matchId: string) {
    if (this.currentUser) {
      const match = this.matches.find((m) => m.id === matchId);
      const playerIndex = match.joueurs.findIndex(
        (player: any) => player.uid === this.currentUser.uid
      );

      if (playerIndex !== -1) {
        match.joueurs.splice(playerIndex, 1);
        this.isRegistered = false;
        console.log('Désinscription réussie');
      }
    } else {
      console.log('Vous devez être connecté pour vous désinscrire');
    }
  }
//CODE POUR AJOUTER UN JOUEUR AVEC LES SERVICES
//   registerForMatch(matchId: string) {
//     if (this.currentUser) {
//       // Remplacez la ligne suivante par celle ci-dessous pour utiliser le service
//       // this.matchService.addPlayerToMatch(matchId, this.currentUser.uid).then(() => {
//       //   console.log('Inscrit avec succès au match');
//       // });
//       const match = this.matches.find((m) => m.id === matchId);
//       match.players.push({ uid: this.currentUser.uid, status: 'pending' });
//       console.log('Inscrit avec succès au match');
//     } else {
//       console.log('Vous devez être connecté pour vous inscrire à un match');
//     }
//   }
//
//   unregisterFromMatch(matchId: string) {
//     if (this.currentUser) {
// // Remplacez la ligne suivante par celle ci-dessous pour utiliser le service
// // this.matchService.removePlayerFromMatch(matchId, this.currentUser.uid).then(() => {
// //   console.log('Désinscription réussie');
//       // });
//       const match = this.matches.find((m) => m.id === matchId);
//       const playerIndex = match.players.findIndex(
//         (player: any) => player.uid === this.currentUser.uid
//       );
//       if (playerIndex !== -1) {
//         match.players.splice(playerIndex, 1);
//         console.log('Désinscription réussie');
//       }
//     } else {
//       console.log('Vous devez être connecté pour vous désinscrire');
//     }
//   }

  ngOnInit(): void {
    this.getMatches();
    this.getCurrentUser();
  }
}
