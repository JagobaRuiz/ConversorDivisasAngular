import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Monedas} from '../../enums/monedas';
import {CurrencyPipe, NgIf, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-tabla-conversiones-habituales',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './tabla-conversiones-habituales.component.html',
  styleUrl: './tabla-conversiones-habituales.component.scss'
})
export class TablaConversionesHabitualesComponent implements OnInit, OnChanges {
  @Input() monedaOrigen!: string;
  @Input() monedaDestino!: string;
  @Input() tasasDeCambio: any;
  monedas = Monedas;
  monedaOrigenTexto!: string;
  monedaDestinoTexto!: string;

  constructor() {}

  ngOnInit(): void {
    this.monedaOrigenTexto = this.monedas[this.monedaOrigen as keyof typeof Monedas];
    if (this.monedaOrigenTexto === this.monedas.AED) {
      this.monedaOrigenTexto = 'Dírham EÁU';
    } else {
      this.monedaOrigenTexto = this.monedaOrigenTexto.split(' - ')[1];
    }

    this.monedaDestinoTexto = this.monedas[this.monedaDestino as keyof typeof Monedas];
    if (this.monedaDestinoTexto === this.monedas.AED) {
      this.monedaDestinoTexto = 'Dírham EÁU';
    } else {
      this.monedaDestinoTexto = this.monedaDestinoTexto.split(' - ')[1];
    }
    //this.calcular();
    // console.log(this.monedas[this.monedaOrigen as keyof typeof Monedas]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monedaOrigen']) {
      this.monedaOrigenTexto = this.monedas[this.monedaOrigen as keyof typeof Monedas];
      this.monedaOrigenTexto = this.monedaOrigenTexto.split(' - ')[1];
    }

    if (changes['monedaDestino']) {
      this.monedaDestinoTexto = this.monedas[this.monedaDestino as keyof typeof Monedas];
      this.monedaDestinoTexto = this.monedaDestinoTexto.split(' - ')[1];
    }
  }

  calcular(monedaOrigen: string, monedaDestino: string, cantidad: number): number {
    const tasaOrigen = this.tasasDeCambio[monedaOrigen];
    const tasaDestino = this.tasasDeCambio[monedaDestino];

    console.log("Tasa de cambio de " + monedaOrigen, tasaOrigen);
    console.log("Tasa de cambio de " + monedaDestino, tasaDestino);
    console.log(tasaDestino);

    const tipoCambio = tasaDestino / tasaOrigen;
    return cantidad * tipoCambio;

    // console.log(this.tasasDeCambio);
    // console.log(this.monedaOrigen);
    // console.log(this.monedaDestino);
  }




}
