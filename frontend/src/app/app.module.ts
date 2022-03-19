import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AUTHINTERCEPTORPROVIDER } from './interceptors/auth.interceptor';
import { MESSAGE_INTERCEPTORPROVIDER } from './interceptors/message.interceptor';
import { customNotifierOptions } from './shared/components/notify/notify';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [
    AuthGuard,
    AUTHINTERCEPTORPROVIDER,
    MESSAGE_INTERCEPTORPROVIDER,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
