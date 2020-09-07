import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { FooterComponent } from './footer/footer.component';
import '@angular/common/locales/global/nl';
@NgModule({
  declarations: [AppComponent, HeaderComponent, SocialMediaComponent, FooterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    ScullyLibModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
