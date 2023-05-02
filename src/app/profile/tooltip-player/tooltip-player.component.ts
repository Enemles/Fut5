import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tooltip-player',
  templateUrl: './tooltip-player.component.html',
  styleUrls: ['./tooltip-player.component.scss']
})
export class TooltipPlayerComponent{
@Input('globalStat') globalStat: string = "99";
@Input('stats') stats: Array<string> = ["88 VIT","91 PAS"];
@Input('image') image: string = "";
}
