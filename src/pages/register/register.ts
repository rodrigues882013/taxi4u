import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {

  constructor(public navCtrl: NavController, translate: TranslateService) {
    RegisterPage.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

}
