import { Component,
         OnInit,
         ViewChild,
         ElementRef,
         EventEmitter,
         Input,
         Output } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';
import { LocationService } from '../../providers/location.service';


declare var google;

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {

  // Method declaration
  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  @Input()  position: [number, number];
  @Output() positionCatched = new EventEmitter();


  constructor(private locationService: LocationService) {
    console.log('Hello MapComponent Component');
  }

  ngOnInit(){
    LocationService.positionChange.subscribe(
      position => {
        this.loadMap(position[0], position[1])
        this.setPosition([position[0], position[1]]);
      }
    )

  }

  loadMap(lat: number, long: number){
    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // create new marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    this.addInfoWindow(marker, "<h4>You are here</h4>");
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  setPosition(pos: [number, number]){
    this.position = pos;
    this.positionCatched.emit({value: pos});
  }

}
