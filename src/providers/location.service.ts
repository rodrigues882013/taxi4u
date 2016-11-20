import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';

import 'rxjs/add/operator/map';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  private lat: number = 0;
  private long: number = 0;

  static positionChange = new EventEmitter<[number, number]>();
  constructor() {
    console.log('Hello LocationService Provider');
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
    LocationService.positionChange.emit(pos);
  }
}
