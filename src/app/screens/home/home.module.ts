import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '../../directives/directives.module';
import { TabGroupComponent } from '../../components/tab-group/tab-group.component';
import { CardDevComponent } from '../../components/card-dev/card-dev.component';
import { DetailsDevComponent } from '../../components/details-dev/details-dev.component';

import { HomeComponent } from './home.component';
@NgModule({
  declarations: [
    TabGroupComponent,
    CardDevComponent,
    DetailsDevComponent,
    HomeComponent,
  ],
  imports: [CommonModule, DirectivesModule],
  exports: [HomeComponent],
})
export class HomeModule {}
