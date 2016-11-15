import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { FormComponent } from "../components/form-component/form.component";
import { LoginFormComponent } from "../components/login-form-component/login-form.component";
import { HeaderComponent } from "../components/header-component/header.component";
import { ContentComponent } from "../components/content-component/content.component";


import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

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
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  schemas: [ NO_ERRORS_SCHEMA ], 
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage
  ],
  providers: []
})
export class AppModule {}
