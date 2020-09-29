import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventItemComponent } from './event-item.component';

@NgModule({
  imports: [CommonModule],
  exports: [EventItemComponent],
  declarations: [EventItemComponent],
  providers: [],
})
export class EventItemModule {}
