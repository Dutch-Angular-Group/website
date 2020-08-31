import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalksComponent } from './talks.component';

const routes: Routes = [
  {
    path: '',
    component: TalksComponent,
  },
  {
    path: ':talkid',
    loadChildren: () => import('../talk/talk.module').then((m) => m.TalkModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalksRoutingModule {}
