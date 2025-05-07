import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, icon, Marker } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
/* const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault; */


const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements AfterViewInit, OnInit {
  posizioneDa!: L.LatLng;
  posizioneA!: L.LatLng;
  map: any;
  private defaultIcon: Icon = icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
  });

  private routingControl: any; // Variabile per memorizzare il controllo di routing

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.8895, 11.0344],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map); // Aggiungiamo subito le tiles alla mappa

    L.Routing.control({
      waypoints: [this.posizioneDa, L.latLng(45.8895, 11.0344)],
      routeWhileDragging: true
    }).addTo(this.map);
    
    const scuole = [
      { lat: 45.886, lng: 11.038, nome: 'Istituto di Istruzione Superiore Don Milani' },
      { lat: 45.895, lng: 11.045, nome: 'Istituto Comprensivo Rovereto Nord' },
      { lat: 45.892, lng: 11.031, nome: 'Scuola Primaria “F.lli Filzi”' },
      { lat: 45.879, lng: 11.042, nome: 'Istituto Comprensivo Rovereto Sud' },
      { lat: 45.891, lng: 11.049, nome: 'Istituto Comprensivo Rovereto Est'
      }
      // Aggiungi qui le coordinate delle altre scuole
    ];

    scuole.forEach(scuola => {
      L.marker([scuola.lat, scuola.lng], { icon: this.defaultIcon })
        .addTo(this.map)
        .bindPopup(scuola.nome);
    });

  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    Marker.prototype.options.icon = this.defaultIcon;
    if (!navigator.geolocation) {
      console.log('Geolocalizzazione non supportata');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        L.marker([lat, lng], { icon: this.defaultIcon }).addTo(this.map).bindPopup('Sei qui!').openPopup();
        // Imposta la posizione dell'utente come punto di partenza predefinito per il routing
/*         this.routingControl.setWaypoints([L.latLng(lat, lng), this.routingControl.getWaypoints()[1]]);
 */      
        this.posizioneDa = L.latLng(lat, lng);

}, (error) => {
        console.error('Errore nella geolocalizzazione:', error);
      });
    }
  }

  watchPosition() {
    navigator.geolocation.watchPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.posizioneDa = L.latLng(lat, lng);
      console.log('Posizione attuale:', this.posizioneDa);
      // Potresti aggiornare la posizione del marker "Sei qui!" qui
    }, (error) => {
      console.error('Errore nella geolocalizzazione:', error);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }
}
