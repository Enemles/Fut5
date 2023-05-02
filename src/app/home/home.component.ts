import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  nextMatch: string = "Bientôt";
  location: string = "Argoulets";

  hour: string = "18H00";
  team: string = "Red";
  statJoueursTemp: string = "99";

  listTeam1: Array<string> = ["Brice", "Matias", "Simon", "Lucas", "Clement"]
  listTeam2: Array<string> = ["Clement", "Jules", "Simon", "Selmene", "Valmond"]
  }
