import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Firestore } from '@angular/fire/firestore';
import {ModalMatchComponent} from "../modal-match/modal-match.component";

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
  matchList: any[] = [
    {
      id: '1',
      name: 'Match 1',
      date: '2021-01-01',
      time: '12:00',
      location: 'Location 1',
      players: [
        { uid: 'LhMzynSvoxQLEnLNuj7vaR7oVup2', name: 'Player 1', status: 'present' },
        { uid: 'user2', name: 'Player 2', status: 'present' },
        { uid: 'user3', name: 'Player 3', status: 'present' },
      ],
      status : 'confirmed'
    },
    {
      id: '2',
      name: 'Match 2',
      date: '2021-01-02',
      time: '12:00',
      location: 'Location 2',
      players: [
        { uid: 'gLsg4wLRvYUxqBBUNb8vuD7bcmG3', name: 'Player 1', status: 'present' },
        { uid: 'user2', name: 'Player 2', status: 'present' },
        { uid: 'user3', name: 'Player 3', status: 'present' },
      ],
      status : 'notconfirmed'
    }
  ];

  selectedMatch: any;

  @ViewChild(ModalMatchComponent, { static: false })

  modal: ModalMatchComponent;

  currentUser: any;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
    });
  }

  isCurrentUser(match: any): any {
    if (!this.currentUser || !match || !match.players) {
      return null;
    }
    return match.players.find((player: any) => player.uid === this.currentUser.uid);
  }


  getStatus(match: any): string | boolean | null {
    const currentUserInMatch = this.isCurrentUser(match);
    return currentUserInMatch ? currentUserInMatch.status : null;
  }


  openModal(match: any) {
    this.selectedMatch = match;
    this.modal.showModal();
  }

  closeModal() {
    this.selectedMatch = null;
    this.modal.hideModal();
  }

  changeStatus(player: any, newStatus: string) {
    player.status = newStatus;
  }



  ngOnInit(): void {
    // this.dataService.getMatchList().subscribe((matches) => {
    //   this.matchList = matches;
    //   console.log(this.matchList);
    // });
  }
}
