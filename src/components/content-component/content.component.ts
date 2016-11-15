import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'content-component',
  templateUrl: 'content.component.html'
})
export class ContentComponent {

  constructor(translate: TranslateService) {
    ContentComponent.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }


}
