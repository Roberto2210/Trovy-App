import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat: number;
  lng: number;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

    let geo: any = this.route.snapshot.paramMap.get('geo');

    geo = geo.substr(4);
    geo = geo.split(',');

    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);

    console.log(this.lat, this.lng);

  }

  ngAfterViewInit() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0bzIyMTAwMDAiLCJhIjoiY2tpNm56cDVoMG9hazJzb2xuOW0xN3E4bSJ9.d1gRtuXsg8SpRZhqmylnWA';

    const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        center: [this.lng, this.lat],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map'
      });

      map.on('load', () => {

        map.resize();

        // Marker
        new mapboxgl.Marker()
          .setLngLat([ this.lng, this.lat ])
          .addTo(map);
          map.addSource('points', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': [
            {
            // feature for Mapbox DC
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [
            -77.03238901390978,
            38.913188059745586
            ]
            },
            
            
            'properties': {
            'title': 'Mapbox DC'
            }
            },

            {
              // feature for Mapbox DC
              'type': 'Feature',
              'geometry': {
              'type': 'Point',
              'coordinates': [
              -77.03238901390978,
              38.913188059745586
              ]
              },
              
              
              'properties': {
              'title': 'Packtovy'
              }
              },
            {
            // feature for Mapbox SF
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [  -77.03238901390978,
            38.913188059745586]
            },
            'properties': {
            'title': 'Camion de la Coca'
            }
            }
            ]
            }
            });

            
// Add a symbol layer
map.addLayer({
  'id': 'points',
  'type': 'symbol',
  'source': 'points',
  'layout': {
  'icon-image': 'custom-marker',
  // get the title name from the source's "title" property
  'text-field': ['get', 'title'],
  'text-font': [
  'Open Sans Semibold',
  'Arial Unicode MS Bold'
  ],
  'text-offset': [0, 1.25],
  'text-anchor': 'top'
  }
  });
  

        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;

        let labelLayerId;
          for (let i = 0; i < layers.length; i ++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
          }
        }

        map.addLayer({
          //'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
          'fill-extrusion-color': '#F35901',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
          }
          }, labelLayerId);
        });


  }

}
