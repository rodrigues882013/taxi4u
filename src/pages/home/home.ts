import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, translate: TranslateService) {
  	translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');  
  }

}
