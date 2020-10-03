import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderModule } from '../../components/header/header.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
