import { AuthService } from './../../seguranca/auth.service';
import { CategoriaService } from './../categoria.service';
import { ErrorService } from './../../core/error.service';
import { CommonModule } from '@angular/common';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private error: ErrorService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa Lancamento');
  }

  pesquisar(pagina = 0) {

    console.log('pesquisar ' + pagina);
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
        console.log('Total registros ' + this.totalRegistros);
      })
      .catch(erro =>  this.error.handle(erro));
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(erro =>  this.error.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Deseja confirmar a exclusão',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  // evento é chamado no load da pagina
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    console.log('Pagina ' + pagina);
    this.pesquisar(pagina);
  }
}
