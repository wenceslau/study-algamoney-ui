import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentoRoutingModule } from './lancamentos/lancamento-routing.module';
import { PessoaRoutingModule } from './pessoas/pessoas-routing.module';
import { SegurancaRoutingModule } from './seguranca/seguranca-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' },
];

@NgModule({

  imports: [
    LancamentoRoutingModule,
    PessoaRoutingModule,
    SegurancaRoutingModule,
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
