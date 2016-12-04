import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'address-form-component',
  templateUrl: 'address-form.component.html'
})

export class AddressFormComponent {

  constructor(translate: TranslateService) {
    AddressFormComponent.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  

}
