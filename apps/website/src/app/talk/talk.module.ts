import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalkRoutingModule } from './talk-routing.module';
import { TalkComponent } from './talk.component';
import { ScullyContentModule } from '@scullyio/ng-lib';


@NgModule({
  declarations: [TalkComponent],
  imports: [
    CommonModule,
    TalkRoutingModule,
    ScullyContentModule
  ]
})
export class TalkModule { }
