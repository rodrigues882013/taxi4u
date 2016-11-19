import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AuthService } from '../../providers/auth-service';



@Component({
  selector: 'login-form-component',
  templateUrl: 'login-form.component.html'
})

export class LoginFormComponent implements OnInit {

  public username: string;
  public password: string;
  @Input()  status = false;
  @Output() loggedIn = new EventEmitter();


  constructor(public translate: TranslateService, public authService: AuthService) {
    LoginFormComponent.startLanguage(translate)
  }

  ngOnInit() {
    AuthService.userLogged.subscribe(
      status => this.changeStatus(status)
    );
  }

  static startLanguage(translate){
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang('pt');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');
  }

  changeStatus(newStatus){
    console.log(newStatus)
    this.status = newStatus;
    this.loggedIn.emit({ value: this.status })
  }

  onLogin(){
    console.log("loging user");
    this.authService.login(this.username, this.password)
  }

}
