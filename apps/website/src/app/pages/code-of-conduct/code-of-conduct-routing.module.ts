import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { CodeOfConductComponent } from './code-of-conduct.component';


const routes: Routes = [
  {
    path: '',
    component: CodeOfConductComponent,
    children: [
      { path: ':slug', component: CodeOfConductComponent },
      { path: '**', component: CodeOfConductComponent },
    ],
  }
];

@NgModule({
  imports: [ScullyLibModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeOfConductRoutingModule { }
