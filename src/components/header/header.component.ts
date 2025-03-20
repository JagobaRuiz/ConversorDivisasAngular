import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  irInicio() {
    this.router.navigate(['inicio']);
  }
}
