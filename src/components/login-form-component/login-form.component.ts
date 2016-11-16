import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'login-form-component',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  constructor(translate: TranslateService, private authService: AuthService) {
    LoginFormComponent.startLanguage(translate)
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  onLogin(){
    console.log("Login")
    this.authService.login("Ola", "Teste");
  }

}
