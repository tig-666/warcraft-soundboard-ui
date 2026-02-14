import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private http = inject(HttpClient);
  private basePath = 'data';

  getRaceList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.basePath}/index.json`);
  }

  getRace(raceName: string): Observable<Race> {
    return this.http.get<Race>(`${this.basePath}/${raceName}.json`);
  }
}
