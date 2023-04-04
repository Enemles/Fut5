import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { PlayerCardComponent } from './player-card/player-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PlayerCardComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    PlayerCardComponent
  ]
})
export class SharedModule { }
