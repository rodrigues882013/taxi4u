import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';




@Component({
  selector: 'page-edit-position',
  templateUrl: 'edit-position.html'
})
export class EditPositionPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello EditPositionPage Page');
  }

}
