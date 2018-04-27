import { ToastyConfig } from 'ng2-toasty';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Injeção para usar o tema no tosty
  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
  ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }
}
