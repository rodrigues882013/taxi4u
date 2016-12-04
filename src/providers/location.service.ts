import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { StringService } from "./string.service";
import { Observable } from 'rxjs/Rx';


import _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  private lat: number = 0;
  private long: number = 0;
  private NOMINATIM_OPEN_STREET_MAPS_API: string;

  static positionChange = new EventEmitter<[number, number]>();
  static errorAddress = new EventEmitter<String>();
  
  constructor(private http: Http, private stringService: StringService) {

    stringService
      .getString()
      .subscribe( res => {
        this.NOMINATIM_OPEN_STREET_MAPS_API = res.NOMINATIM_OPEN_STREET_MAPS_API;
      });

    // Get initial position
    Geolocation.getCurrentPosition()
      .then((position: Geoposition) => {
        if (position.coords.latitude !== undefined &&
           position.coords.longitude !== undefined)

           if (position.coords.latitude !== this.lat || position.coords.longitude !== this.long)
             this.updatePosition(position.coords.latitude, position.coords.longitude);

      }).catch((error) => {
          console.log('Error getting location', error);
      });

    
    // Watcher every change in position
    Geolocation.watchPosition()
      .subscribe((position: Geoposition) => {
        if (position.coords.latitude !== undefined &&
           position.coords.longitude !== undefined)
           this.updatePosition(position.coords.latitude, position.coords.longitude);
      });
  }

  updatePosition(lat: number, long: number){
    let pos: [number, number] = [lat, long];
    this.lat = lat;
    this.long = long;
    window.localStorage.setItem("location", (lat + "," + long).toString())
    LocationService.positionChange.emit(pos);
  }

  getPlace(){
    let url = this.NOMINATIM_OPEN_STREET_MAPS_API
    let params: URLSearchParams = new URLSearchParams();

    params.set('lat', window.localStorage.getItem('location').split(',')[0].toString());
    params.set('lon', window.localStorage.getItem('location').split(',')[1].toString());
    params.set('format', 'json');

    return this.http.get(url, {search: params})
                    .map( res => res.json())  
  }

  emitErrorInAddress(errMsg: string){
    LocationService.errorAddress.emit(errMsg)
  }

  storageCurrentPlace(address): boolean{

    if (_.isUndefined(address.street)) return false; 
    if (_.isUndefined(address.town)) return false; 
    if (_.isUndefined(address.city)) return false; 
    
    window.localStorage.setItem("currentAddres", JSON.stringify(address))
    return true;
  
  }
}
