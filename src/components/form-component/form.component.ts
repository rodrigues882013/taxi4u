import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'form-component',
  templateUrl: 'form.component.html'
})
export class FormComponent {

  protected name: string;
  protected celphone: string;
  protected localization: string;

  constructor(translate: TranslateService) {
    FormComponent.startLanguage(translate);
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

}
