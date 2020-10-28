import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalksComponent } from './talks.component';

const routes: Routes = [
  {
    path: '',
    component: TalksComponent,
    children: [
      { path: ':talkid', component: TalksComponent },
      { path: '**', component: TalksComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalksRoutingModule {}
