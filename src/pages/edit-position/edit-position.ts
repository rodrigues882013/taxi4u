import { Component } from '@angular/core';
import { NavController, App, ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { HomePage } from '../home/home';





@Component({
  selector: 'page-edit-position',
  templateUrl: 'edit-position.html'
})
export class EditPositionPage {

  public fixed: boolean;

  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello EditPositionPage Page');
  }

  fixedPosition(event){
    console.log(event)
    if (event.fixed) {
      this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push(HomePage);
    }
  }

}
