import { Injectable } from '@angular/core';
import { SchoolsData } from '../interfaces/schools-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectusService {


private readonly apiUrl = "https://api.retescuolevallagarina.it";

async getSchoolsData(): Promise<SchoolsData | null> {
  const data = await this.http.get<SchoolsData>(`${this.apiUrl}/items/schools`).toPromise();
  return data ?? null;
}


  constructor(private http: HttpClient) { }
}