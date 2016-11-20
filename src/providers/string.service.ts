import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StringService {

  constructor(private http: Http) { }

  getString(){
    return this.http.get('./assets/constants/strings.json')
                    .map( res => res.json())
  }

}
