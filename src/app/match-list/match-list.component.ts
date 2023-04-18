import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Firestore } from '@angular/fire/firestore';

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
      players: ['Player 1', 'Player 2', 'Player 3'],
    },
    {
      id: '2',
      name: 'Match 2',
      date: '2021-01-02',
      time: '12:00',
      location: 'Location 2',
      players: ['Player 1', 'Player 2', 'Player 3'],
    }
  ];

  constructor(private dataService: DataService, public authService: AuthService, private firestore: Firestore) {}
  showMatchDetails(matchId: string) {
    console.log(matchId);
  }
  ngOnInit(): void {
    this.dataService.getMatchList().subscribe((matches) => {
      this.matchList = matches;
      console.log(this.matchList);
    });
  }
}
