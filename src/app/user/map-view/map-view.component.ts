import { Component, Input, OnInit } from '@angular/core';
import { map } from 'jquery';
import maplibregl, { LngLat, Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit {
  @Input() charities: any[] = [];
  markers: Marker[] = [];
  ngOnInit(): void {
    console.log(this.charities);
  }
  mapClick(event: any) {
    console.log(event);
  }
  popUp(event: any) {
    console.log(event);
  }
  mapRender() {
    // console.log('rendered');
  }
  mapRef!: Map;
  mapLoaded(map: Map) {
    this.mapRef = map;
    this.charities.forEach((v, i) => {
      let marker = new maplibregl.Marker({
        color: '#f7ca44',
      })
        .setLngLat([v.longitude, v.latitude])
        .setPopup(
          new maplibregl.Popup().setHTML(this.getEl(v.imagePath, v.charityName))
        )
        .addTo(map);
      this.markers.push(marker);
    });
  }
  getEl(img: string, name: string): string {
    return `<div><img src="../../../assets/Images/${img}" width="200" height="150" style="object-fit: cover;"></div><div><p class="text-center mt-2 h6">${name}</p></div>`;
  }
  async updateMap(event: any) {
    
    let filteredMarkers: Marker[] = [];
    await new Promise<void>((res) => {
      this.markers.forEach((m) => m.remove());
      let filteredCharity = this.charities
        .filter((v) => v.charityName.indexOf(event.target.value) > -1)
        .map((v) => {
          return new LngLat(v.longitude, v.latitude);
        });
  

      filteredMarkers = this.markers.filter((m) => {
        let ret = false;
        filteredCharity.forEach((c) => {
          if(m.getLngLat().lat == c.lat && m.getLngLat().lng == c.lng) ret = true;

        });
        return ret;
      });

      res();
    });

    console.log('filteredMarkers : ' + filteredMarkers);

    filteredMarkers.forEach((m) => m.addTo(this.mapRef));
  }
}
