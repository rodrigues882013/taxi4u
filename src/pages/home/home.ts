import { Component, OnInit } from '@angular/core';
import { NavController, App, ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { AuthService } from '../../providers/auth.service';

import { EditPositionPage } from '../edit-position/edit-position';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  public position: [number, number];
  public fixed: boolean;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              translate: TranslateService,
              public appCtrl: App,
              public viewCtrl: ViewController) {
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

  registerPosition(event){
    if (event.value) this.setPosition(event.value);
  }

  setPosition(pos: [number, number]){
    this.position = pos;
  }

  fixedPosition(event){
    if (!event.value) {
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push(EditPositionPage);
    } else {
      
    }
  }
}
