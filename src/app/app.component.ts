import { Component, ViewChild, OnInit } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TranslateService } from 'ng2-translate';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(protected platform: Platform,
              protected menu: MenuController,
              protected translate: TranslateService) {

    menu.enable(true);
    this.init(translate);
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage }
    ];
  }

  ngOnInit(){

  }

  init(translate) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      MyApp.startLanguage(translate);
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }
}
