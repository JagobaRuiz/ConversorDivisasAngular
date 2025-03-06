import {Component, OnInit} from '@angular/core';
import {ConversorService} from '../../services/conversor.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Monedas} from '../../enums/monedas';

@Component({
  selector: 'app-inicio',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  tasasDeCambio: any = {};
  monedaOrigen: string='';
  monedaDestino: string='';
  cantidad: number = 0;
  formularioConversion: FormGroup;
  conversion: number | null = null;
  monedas = Monedas;

  constructor(private conversorService: ConversorService) {
    this.formularioConversion = new FormGroup({
      monedaOrigen: new FormControl('', [Validators.required]),
      monedaDestino: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit(): void {
    this.conversorService.getTasasDeCambio().subscribe({
      next: (tasas: any) => {
        this.tasasDeCambio = tasas.rates;
      }
    })
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).sort();
  }

  getMoneda(key: string): string | null {
    if (this.monedas[key as keyof typeof this.monedas]) {
      return this.monedas[key as keyof typeof this.monedas].toString();
    }
    return null;
  }

  convertir() {
    this.monedaOrigen = this.formularioConversion.get('monedaOrigen')?.value;
    this.monedaDestino = this.formularioConversion.get('monedaDestino')?.value;
    this.monedaDestino = this.formularioConversion.get('monedaDestino')?.value;
    this.cantidad = this.formularioConversion.get('cantidad')?.value;

    console.log(this.monedaOrigen);
    console.log(this.monedaDestino);

    const tasaOrigen = this.tasasDeCambio[this.monedaOrigen];
    const tasaDestino = this.tasasDeCambio[this.monedaDestino];
    if (tasaOrigen && tasaDestino) {
      // Calcula el tipo de cambio relativo
      const tipoCambio = tasaDestino / tasaOrigen;
      this.conversion = this.cantidad * tipoCambio;
    } else {
      this.conversion = null;
      alert('Tipo de cambio no disponible para las monedas seleccionadas.');
    }
  }
}
