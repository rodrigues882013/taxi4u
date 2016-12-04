import { Component, Injectable, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { LocationService } from '../../providers/location.service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'action-buttons-component',
  templateUrl: 'action-buttons.component.html'
})

export class ActionButtonsComponent {

  protected title: string;
  protected message: string;
  protected btnFix: string;
  protected btnEdit: string;

  @Input()  fixed: boolean;
  @Output() fixedPosition = new EventEmitter();

  constructor(public translate: TranslateService,
              public locationService: LocationService,
              public alertCtrl: AlertController) {
    ActionButtonsComponent.startLanguage(translate);
  }

  ngOnInit(){
    this.translate.get("FIX_POSITION").subscribe( res => this.title = res);
    this.translate.get("ASK_POSITION").subscribe( res => this.message = res);
    this.translate.get("BTN_FIX").subscribe( res => this.btnFix = res);
    this.translate.get("BTN_EDIT").subscribe( res => this.btnEdit = res);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  
  createModal(){
    
    let confirm = this.alertCtrl.create({
      title: this.title,
      message: this.message,
      buttons: [
        {
          text: this.btnFix,
          handler: () => {
            this.fixPosition();
          }
        },
        {
          text: this.btnEdit,
          handler: () => {
             this.fixedPosition.emit({value: false});   
          }
        }
      ]
    });

    return confirm;
  }

  onFixPosition(){
    this.createModal().present();
  }

  fixPosition(){
    
    this.locationService.getPlace().subscribe( res => {
      let address = {};
      address['street'] = res.address.road;
      address['city'] = res.address.city;
      address['town'] = res.address.suburb;
      
      this.locationService.storageCurrentPlace(address);
      this.fixedPosition.emit({value: true});   
    });
  }

}
