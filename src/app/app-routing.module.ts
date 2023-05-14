import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './match-list/match-list.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'matches', component: MatchListComponent , canActivate: [AuthGuard]},
  { path: 'players/:id', component: PlayerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
