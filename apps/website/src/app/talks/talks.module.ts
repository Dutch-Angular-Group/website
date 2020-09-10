import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalksRoutingModule } from './talks-routing.module';
import { TalksComponent } from './talks.component';
import { EventItemModule } from '../event-item/event-item.module';

@NgModule({
  declarations: [TalksComponent],
  imports: [CommonModule, TalksRoutingModule, EventItemModule],
})
export class TalksModule {}
