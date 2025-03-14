import {Component, Input, OnInit} from '@angular/core';
import {ConversorService} from '../../services/conversor.service';
import {Monedas} from '../../enums/monedas';


@Component({
  selector: 'app-tabla-conversiones-habituales',
  imports: [
  ],
  templateUrl: './tabla-conversiones-habituales.component.html',
  styleUrl: './tabla-conversiones-habituales.component.scss'
})
export class TablaConversionesHabitualesComponent implements OnInit {
  @Input() monedaOrigen!: string;
  @Input() monedaDestino!: string;
  @Input() tasasDeCambio: any;
  monedas = Monedas;

  constructor() {}

  ngOnInit(): void {
    this.calcular();
  }

  calcular() {
    console.log(this.tasasDeCambio);
    console.log(this.monedaOrigen);
    console.log(this.monedaDestino);
  }




}
