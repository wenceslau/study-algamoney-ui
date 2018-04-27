import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ErrorService } from '../../core/error.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  nome: string;
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private error: ErrorService,
    private title: Title
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.title.setTitle('Pesquisa Pessoa');
    this.pesquisar();
  }

  pesquisar() {
    console.log('pesquisar ' + this.nome);
    this.pessoaService.pesquisar(this.nome)
      .then(resultado => {
        console.log('Resultado: ' + resultado.pessoas);
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.error.handle(erro));
  }

  // evento é chamado no load da pagina
  aoMudarPagina(event: LazyLoadEvent) {
    console.log('aoMudarPagina');
    this.pesquisar();
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toasty.success('Pessoa excluída com sucesso!');
      })
      .catch(erro => this.error.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Deseja confirmar a exclusão',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.alteraStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.error.handle(erro));
}

}
