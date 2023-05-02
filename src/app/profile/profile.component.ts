import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  nextMatch: string = "Bientôt";
  location: string = "Argoulets";

  hour: string = "18H00";
  team: string = "Red";
  statJoueursTemp: string = "99";

  listTeam1: Array<string> = ["Brice", "Matias", "Simon", "Lucas", "Clement"]
  listTeam2: Array<string> = ["Clement", "Jules", "Simon", "Selmene", "Valmond"]
}
