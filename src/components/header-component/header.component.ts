import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'header-component',
  templateUrl: 'header.component.html'
})

export class HeaderComponent {

  constructor(translate: TranslateService) {
    HeaderComponent.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

}
