import { Injectable } from '@angular/core';
import { SchoolsData } from '../interfaces/schools-data';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Scuola } from '../interfaces/scuola';
import { ScuolaDettagliata } from '../interfaces/scuola-dettagliata';
import { EventsData } from '../interfaces/events-data';
import { Video } from '../interfaces/scuolaMoreInformation.interface';
import { EducationalPathsData, EducationalPath } from '../interfaces/educational-paths';

@Injectable({
  providedIn: 'root'
})
export class DirectusService {


private readonly apiUrl = "https://api.retescuolevallagarina.it";


 getSchoolsData(): Observable<SchoolsData | null> {
  return this.http.get<SchoolsData>(`${this.apiUrl}/items/schools`);
}

getSchoolData(id: string): Observable<Scuola | null> {
  return this.http.get<Scuola>(`${this.apiUrl}/items/schools/${id}`);
 }

 getMoreSchoolData(): Observable<ScuolaDettagliata | null> {
  return this.http.get<ScuolaDettagliata>(`${this.apiUrl}/items/schools?fields=%2A,%2A.%2A`);
 }

 getEventsData(): Observable<EventsData | null> {
  return this.http.get<EventsData>(`${this.apiUrl}/items/events`);
}

getEventsForSchool(schoolId: string): Observable<EventsData | null> {
  return this.http.get<EventsData>(`${this.apiUrl}/items/events?filter[school][_eq]=${schoolId}`);
}

/**
 * Recupera i dati di un video specifico dall'API
 * @param id ID del video da recuperare
 * @returns Dati completi del video
 */
getVideoUrl(id: string): Observable<any> {
  if (!id) {
    console.error('ID video non fornito');
    return new Observable(observer => {
      observer.error('ID video non fornito');
      observer.complete();
    });
  }
  
  console.log(`Recupero video con ID: ${id}`);
  return this.http.get<any>(`${this.apiUrl}/items/videos/${id}`);
}

 // Metodi per ottenere gli Educational Paths
 getAllEducationalPaths(): Observable<EducationalPathsData | null> {
  return this.http.get<EducationalPathsData>(`${this.apiUrl}/items/educational_paths`);
 }

 getEducationalPath(id: string): Observable<EducationalPath | null> {
  return this.http.get<EducationalPath>(`${this.apiUrl}/items/educational_paths/${id}`);
 }

 getEduLinksForSchool(schoolId: string): Observable<any> {
  // Ottieni i link educativi direttamente dalla scuola
  return this.http.get<any>(`${this.apiUrl}/items/schools/${schoolId}?fields=edu_links.*,edu_links.educational_path.*`);
 }

 getSchoolEmails(schoolId: string): Observable<any> {
  // Ottieni tutte le email per una specifica scuola dall'endpoint school_emails
  return this.http.get<any>(`${this.apiUrl}/items/school_emails?filter[school][_eq]=${schoolId}`);
 }

 getSchoolPhones(schoolId: string): Observable<any> {
  // Ottieni tutti i numeri di telefono per una specifica scuola dall'endpoint school_phones
  return this.http.get<any>(`${this.apiUrl}/items/school_phones?filter[school][_eq]=${schoolId}`);
 }

 getEducationalPathsByIds(ids: string[]): Observable<EducationalPathsData | null> {
  const filter = ids.map(id => `filter[id][_eq]=${id}`).join('&');
  return this.http.get<EducationalPathsData>(`${this.apiUrl}/items/educational_paths?${filter}`);
 }


constructor(private http: HttpClient) { }



}


