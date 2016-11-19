import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              translate: TranslateService) {
    HomePage.startLanguage(translate)
  }

  ngOnInit(){
    if (!this.authService.isLogged())
      console.log("Working")
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

}
