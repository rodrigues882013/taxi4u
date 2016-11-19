import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { AuthService } from '../../providers/auth-service';

import { HomePage } from '../home/home';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public status: boolean = false;

  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public authService: AuthService,
              public viewCtrl: ViewController,
              translate: TranslateService) {
    LoginPage.startLanguage(translate)
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  ngOnInit(){
    if (this.authService.isLogged()) this.changePage();
  }

  changePage(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(HomePage);
  }

  userAuthenticated(event){
    if (event.value) this.changePage();
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}
