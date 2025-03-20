import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private apiUrl = 'https://cdn.dinero.today/api/latest.json';
  constructor(private http: HttpClient) { }


  getTasasDeCambio(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
