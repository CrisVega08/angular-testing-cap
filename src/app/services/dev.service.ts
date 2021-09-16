import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dev } from '../models/devs';

@Injectable({ providedIn: 'root' })
export class DevsService {
  constructor(private http: HttpClient) {}

  findDevById(devId: number): Observable<Dev> {
    return this.http.get<Dev>(`api/devs/${devId}`);
  }

  findAllDevs(): Observable<Dev[]> {
    return this.http.get('api/devs') as Observable<Dev[]>;
  }

  saveDev(devId: number, changes: Partial<Dev>): Observable<Dev> {
    return this.http.put<Dev>(`api/devs/${devId}`, changes);
  }
}
