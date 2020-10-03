import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/nl';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    HeaderModule,
    FooterModule,

    ScullyLibModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
