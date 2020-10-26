import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { DocsPageComponent } from './docs-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocsPageComponent,
    children: [
      { path: ':slug', component: DocsPageComponent },
      { path: '**', component: DocsPageComponent },
    ],
  }
];

@NgModule({
  imports: [ScullyLibModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsPageRoutingModule { }
