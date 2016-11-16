import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StringService } from "./string-service";

import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  private API_BASE: string;

  constructor(public http: Http, private stringService: StringService) {
    stringService.getString();
    console.log(this.API_BASE);
  }

  login(username: string, password: string){
    console.log("Logando")
  }

}
