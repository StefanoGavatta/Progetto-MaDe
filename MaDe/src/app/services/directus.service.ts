import { Injectable } from '@angular/core';
import { SchoolsData } from '../interfaces/schools-data';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Scuola } from '../interfaces/scuola';
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

  constructor(private http: HttpClient) { }

}


