import { AuthService } from './../seguranca/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { JwtHelper } from 'angular2-jwt';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { ErrorService } from './error.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../lancamentos/categoria.service';
import { LancamentoService } from '../lancamentos/lancamento.service';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],

  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],

  exports: [
    ToastyModule,
    ConfirmDialogModule,
    NavbarComponent,
  ],

  providers: [
    ErrorService,
    PessoaService,
    CategoriaService,
    LancamentoService,
    AuthService,
    JwtHelper,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
