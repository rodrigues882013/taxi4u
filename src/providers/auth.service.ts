import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { StringService } from "./string.service";

import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

  private API_BASE: string;
  static userLogged = new EventEmitter<boolean>();

  constructor(private http: Http, private authHttp: AuthHttp, private stringService: StringService) {
    stringService
      .getString()
      .subscribe( res => this.API_BASE = res.API_BASE);

  }

  login(username: string, password: string): any {
    let body = JSON.stringify({username: username, password: password});
    let result = this.authHttp.post(this.API_BASE, body)
                     .map(res => res.json())
                     .catch((e: any) => Observable.throw(e || 'Server error'));

    result.subscribe(res => {
      let token = res.id_token.split(" ")[1];
      let status: any;

      if (token !== undefined && token !== ''){
        window.localStorage.setItem("id_token", token);
        window.localStorage.setItem("status", JSON.stringify(true));
        status = true;
      } else status = false;

      AuthService.userLogged.emit(status);

    });

  }

  isLogged(){
    return JSON.parse(window.localStorage.getItem('status'));
  }
}
