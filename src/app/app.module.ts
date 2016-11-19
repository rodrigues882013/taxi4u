
// Core of angular and Ionic
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';


// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

//Components
import { FormComponent } from "../components/form-component/form.component";
import { LoginFormComponent } from "../components/login-form-component/login-form.component";
import { HeaderComponent } from "../components/header-component/header.component";
import { ContentComponent } from "../components/content-component/content.component";

// Services
import { AuthService } from "../providers/auth-service";
import { StringService } from "../providers/string-service";

//External dependecies
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';



let storage = new Storage();

export function getAuthHttp(http) {
  console.log('Working')
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'id_token',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => window.localStorage.getItem('id_token')),
  }), http);
}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    FormComponent,
    LoginFormComponent,
    HeaderComponent,
    ContentComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [ IonicApp ],
  schemas: [ NO_ERRORS_SCHEMA ],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage
  ],
  providers: [
    AuthService,
    StringService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
