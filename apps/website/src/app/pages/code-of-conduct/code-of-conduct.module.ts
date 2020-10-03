import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { CodeOfConductRoutingModule } from './code-of-conduct-routing.module';
import { CodeOfConductComponent } from './code-of-conduct.component';


@NgModule({
  declarations: [CodeOfConductComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    CodeOfConductRoutingModule
  ]
})
export class CodeOfConductModule { }
