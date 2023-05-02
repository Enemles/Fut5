import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {

  perf: number = 99;
  nickname: string = "L'atout";

  PAC: number = 95;
  SHO: number = 95;
  PAS: number = 95;
  DRI: number = 95;
  DEF: number = 95;
  PHY: number = 95;



}
