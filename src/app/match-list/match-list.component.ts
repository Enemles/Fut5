import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Firestore } from '@angular/fire/firestore';
import {ModalMatchComponent} from "../modal-match/modal-match.component";
import {MatchService} from "../match.service";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
  matches: any[] = [];
  currentUser: any;
  selectedMatch: any;

  @ViewChild(ModalMatchComponent, { static: false })

  modal: ModalMatchComponent;

  constructor(private matchService: MatchService, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
    });
  }

  getStatus(match: any): string | boolean | null {
    const currentUserInMatch = this.isCurrentUser(match);
    return currentUserInMatch ? currentUserInMatch.status : null;
  }


  async addMatch() {
    const match = {
      equipe1: 'Equipe 1',
      equipe2: 'Equipe 2',
      lieu: 'Stade XYZ',
      date: '2023-05-10',
      heure: '14:00',
      joueurs: [
        {
          joueurId: 'tmIrKGO8Q9Tvp3hy7BPmtVB6szd2',
          displayName: 'Joueur 1',
          present: true,
        },
        {
          joueurId: 'joueur2',
          displayName: 'Joueur 2',
          present: false,
        },
      ],
    };

    try {
      const matchId = await this.matchService.createMatch(match);
      console.log('Match créé avec succès', matchId);
      this.matches.push(match);
    } catch (error) {
      console.error('Erreur lors de la création du match :', error);
    }
  }

  isCurrentUser(match: any): any {
    if (!this.currentUser || !match || !match.players) {
      return null;
    }
    return match.players.find((player: any) => player.uid === this.currentUser.uid);
  }
  openModal(match: any) {
    this.selectedMatch = match;
    this.modal.showModal();
  }

  changeStatus(player: any, newStatus: string) {
    player.status = newStatus;
  }

  getMatches() {
    this.matchService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  registerForMatch(matchId: string) {
    if (this.currentUser) {
      this.matchService
        .addPlayerToMatch(matchId, this.currentUser.uid)
        .then(() => {
          console.log('Inscrit avec succès au match');
        });
    } else {
      console.log('Vous devez être connecté pour vous inscrire à un match');
    }
  }

  unregisterFromMatch(matchId: string) {
    if (this.currentUser) {
      this.matchService
        .removePlayerFromMatch(matchId, this.currentUser.uid)
        .then(() => {
          console.log('Désinscription réussie');
        });
    } else {
      console.log('Vous devez être connecté pour vous désinscrire');
    }
  }

  ngOnInit(): void {
    this.getMatches();
    this.getCurrentUser();
  }
}
