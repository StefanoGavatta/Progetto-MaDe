import { AfterViewInit, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import * as L from 'leaflet';
import { Icon, icon, Marker } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { DirectusService } from '../../../services/directus.service';
import { SchoolsData } from '../../../interfaces/schools-data';

interface Scuola {
  lat: number;
  lng: number;
  nome: string;
  logo: string;
  id: string
}


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




@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',

})
export class MapsComponent implements AfterViewInit, OnInit {

  posizioneDa!: L.LatLng;
  posizioneA!: L.LatLng;
  map: any;
  scuolaData: WritableSignal<SchoolsData | null> = signal(null);
 defaultIcon = new L.Icon({
  iconUrl: "/verde.png",
  iconSize: [80, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

  private scuole : Scuola[] = [];

    // Aggiungi qui le coordinate delle altre scuole

/*   private defaultIcon: Icon = icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png"
  }); */


  private defaultIconPuntatori: Icon = icon({
    iconUrl: "/blue.png",
    iconSize: [20, 30], // Imposta la larghezza e l'altezza desiderate (es. 32x32 pixel)
    iconAnchor: [16, 32], // Imposta il punto dell'icona che corrisponde alla posizione (es. il centro inferiore)
    popupAnchor: [0, -32]  // Imposta dove si "aggancia" la popup rispetto all'icona (es. sopra il centro)
  });

  private routingControl: any; // Variabile per memorizzare il controllo di routing
  private directusService: DirectusService = inject(DirectusService)
  
  private initMap(): void {
    
    this.directusService.getSchoolsData().subscribe(dati => {
      this.map = L.map('map', {
        center: [45.8895, 11.0344],
        zoom: 15
      });
  
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map); // Aggiungiamo subito le tiles alla mappa
      Marker.prototype.options.icon = this.defaultIconPuntatori;

      L.Routing.control({
        waypoints: [L.latLng(45.8895, 11.0344),L.latLng(45.8895, 11.0344)],
        routeWhileDragging: true,
        fitSelectedRoutes: false, // Questo impedisce lo zoom automatico
        addWaypoints: false // Opzionale: disabilita l'aggiunta di waypoints tramite click
      }).addTo(this.map);

      Marker.prototype.options.icon = this.defaultIcon;
      this.scuolaData.set(dati)
       const data = this.scuolaData()?.data;
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          this.scuole.push({
            lat: data[i].position.coordinates[1],
            lng: data[i].position.coordinates[0],
            nome: data[i].name,
            logo:` https://api.retescuolevallagarina.it/assets/${data[i].logo}`,
            id: data[i].id
          })
        }

/*         for (let i = 0; i < data.length; i++) {
          L.marker([this.scuole[i].lat, this.scuole[i].lng], { icon: this.defaultIcon })
          .addTo(this.map)
          .bindPopup(`<b>${this.scuole[i].nome}</b><br><img src="${this.scuole[i].logo}" alt="${this.scuole[i].nome} logo" style="width:50px;height:auto;">`);
        }
 */
        this.scuole.forEach(scuola => {
          L.marker([scuola.lat, scuola.lng], { icon: this.defaultIcon })
            .addTo(this.map)
            .bindPopup(`<b><a href="/scuole/${scuola.id}" style="color:#3a5cff; text-decoration:underline;">${scuola.nome}</a><br><img src="${scuola.logo}" alt="${scuola.nome} logo" style="width:50px;height:auto;">`);
        });       
        
        Marker.prototype.options.icon = this.defaultIconPuntatori;

      } else {
      } 

  });
  }

 
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    Marker.prototype.options.icon = this.defaultIcon;
    if (!navigator.geolocation) {
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


