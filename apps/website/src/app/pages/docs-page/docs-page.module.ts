import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { DocsPageRoutingModule } from './docs-page-routing.module';
import { DocsPageComponent } from './docs-page.component';

@NgModule({
  declarations: [DocsPageComponent],
  imports: [CommonModule, ScullyLibModule, DocsPageRoutingModule],
})
export class DocsPageModule {}
