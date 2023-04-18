import {Component, Input, OnInit} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
  matchDetails: any = null;

  constructor(private dataService: DataService) {}

  @Input() matchId ?: string;

  ngOnInit(): void {}

  showMatchDetails(matchId: number): void {
    this.dataService.getMatchDetails(matchId).subscribe((match) => {
      this.matchDetails = match;
    });
  }
}
