import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'talks', loadChildren: () => import('./pages/talks/talks.module').then(m => m.TalksModule) },
  { path: '', pathMatch: 'full', redirectTo: 'talks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
