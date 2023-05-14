import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthGuard} from "./auth.guard";
import {TooltipPlayerComponent} from "./profile/tooltip-player/tooltip-player.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'matches', component: MatchListComponent , canActivate: [AuthGuard]},
  { path: 'matches/:id', component: MatchDetailsComponent },
  { path: 'players/:id', component: PlayerDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tooltip', component: TooltipPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
