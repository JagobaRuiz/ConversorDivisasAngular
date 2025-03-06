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

// Función para convertir monedas
  convertirMoneda(importeAConvertir: number, monedaOrigen: string, monedaAConvertir: string, tasas: any): number {
    const tasaOrigen = tasas[monedaOrigen];
    const tasaMonedaAConvertir = tasas[monedaAConvertir];
    return (importeAConvertir / tasaOrigen) * tasaMonedaAConvertir;
  }
}
