import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

declare var google;

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {

  private map: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor() {
    console.log('Hello MapComponent Component');

  }

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
