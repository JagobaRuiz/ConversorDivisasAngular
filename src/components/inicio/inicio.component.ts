import {Component, OnInit} from '@angular/core';
import {ConversorService} from '../../services/conversor.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Monedas} from '../../enums/monedas';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {
  TablaConversionesHabitualesComponent
} from '../tabla-conversiones-habituales/tabla-conversiones-habituales.component';

@Component({
  selector: 'app-inicio',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    CurrencyPipe,
    NgIf,
    NgOptimizedImage,
    MatSelectModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    NgxMatSelectSearchModule,
    TablaConversionesHabitualesComponent
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
  monedasArray  = Object.entries(Monedas);
  resultadosBusquedaMonedaOrigen = [...this.monedasArray];
  resultadosBusquedaMonedaDestino = [...this.monedasArray];

  constructor(private conversorService: ConversorService) {
    this.formularioConversion = new FormGroup({
      monedaOrigen: new FormControl('', [Validators.required]),
      monedaDestino: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      busquedaMonedaOrigen: new FormControl(null),
      busquedaMonedaDestino: new FormControl(null),
    })

  }

  ngOnInit(): void {
    this.conversorService.getTasasDeCambio().subscribe({
      next: (tasas: any) => {
        this.tasasDeCambio = tasas.rates;
      }
    })

    //Suscripción al cambio de valor de los desplegables para que
    this.formularioConversion.get('monedaOrigen')?.valueChanges.subscribe((monedaOrigen) => {
      this.convertir();
    });

    this.formularioConversion.get('monedaDestino')?.valueChanges.subscribe((monedaDestino) => {
      this.convertir();
    });
    // console.log(this.resultadosBusquedaMonedaOrigen);
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
    this.cantidad = this.formularioConversion.get('cantidad')?.value;

    console.log(this.monedaOrigen);
    console.log(this.monedaDestino);

    if(this.monedaOrigen && this.monedaDestino && this.cantidad) {
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
    } else {
      this.conversion = null;
    }


  }

  buscar(origenOdestino: string) {
    if (origenOdestino === "origen") {
      const palabraAbuscar = this.eliminarTildes(this.formularioConversion.get('busquedaMonedaOrigen')?.value.toLowerCase());
      console.log(palabraAbuscar);
      this.resultadosBusquedaMonedaOrigen = this.monedasArray.filter(([key, value]) =>
        this.eliminarTildes(value.toLowerCase()).includes(palabraAbuscar)
      );
    } else {
      const palabraAbuscar = this.eliminarTildes(this.formularioConversion.get('busquedaMonedaDestino')?.value.toLowerCase());
      this.resultadosBusquedaMonedaDestino = this.monedasArray.filter(([key, value]) =>
        this.eliminarTildes(value.toLowerCase()).includes(palabraAbuscar)
      );
    }
  }

  limpiarBusqueda(origenOdestino: string) {
    if (origenOdestino === "origen") {
      this.formularioConversion.get('busquedaMonedaOrigen')?.setValue('');
      this.resultadosBusquedaMonedaOrigen = [...this.monedasArray];
    } else {
      this.formularioConversion.get('busquedaMonedaDestino')?.setValue('');
      this.resultadosBusquedaMonedaDestino = [...this.monedasArray];
    }
  }

  eliminarTildes(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres diacríticos
  }


  invertirOrigenYdestino() {
    const monedaOrigen = this.formularioConversion.get('monedaOrigen')?.value;
    const monedaDestino = this.formularioConversion.get('monedaDestino')?.value;

    this.formularioConversion.get('monedaOrigen')?.setValue(monedaDestino);
    this.formularioConversion.get('monedaDestino')?.setValue(monedaOrigen);

    if (this.formularioConversion.get('cantidad')?.value) {
      this.convertir();
    }
  }
}
