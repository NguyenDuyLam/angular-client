import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpModule } from '@angular/http';
import { JwtInterceptor } from './services/helper/Jwt.Interceptor';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';


registerLocaleData(en);

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('290317923205-vo36soeg5kb1grf8hep9o0rcu3ac0llc.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2245317075766854')
  }
], false);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    SocialLoginModule

  ],

  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ]
})
export class AppModule { }
