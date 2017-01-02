import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { LocationService } from '../../providers/location.service';



class Address {

  public street: string;
  public _number: number;
  public town: string;
  public city: string;

  constructor(street: string, _number: number, town: string, city: string){
    this.street = street;
    this._number = _number;
    this.town = town;
    this.city = city;
  }
}

@Component({
  selector: 'address-form-component',
  templateUrl: 'address-form.component.html'
})



export class AddressFormComponent {

  protected address: Address = new Address(null, null, null, null);
  @Output() positionFixed = new EventEmitter();

  constructor(translate: TranslateService, private locationService: LocationService) {
    AddressFormComponent.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  onFixPosition(){
    console.log(this.address.town)
    if(this.locationService.storageCurrentPlace(this.address))
      this.positionFixed.emit({fixed: true});
  }



}
