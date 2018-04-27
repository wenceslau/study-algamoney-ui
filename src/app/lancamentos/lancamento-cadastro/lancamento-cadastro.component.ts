import { LancamentoService } from './../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';

import { ErrorService } from './../../core/error.service';
import { CategoriaService } from './../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private error: ErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo']);

    this.title.setTitle('Novo Lancamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTitulo();
      })
      .catch(erro => this.error.handle(erro));
  }

  listarCategorias() {
    return this.categoriaService.listar()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.error.handle(erro));
  }

  listarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.error.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    console.log(this.lancamento);
    this.lancamentoService.salvar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.toasty.success('Lancamento salvo com sucesso');
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.error.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    console.log(this.lancamento);
    this.lancamentoService.atulizar(this.lancamento)
      .then(lancamento => {
        this.toasty.success('Lancamento atualizado com sucesso');
        this.lancamento = lancamento;
        this.atualizarTitulo();
      })
      .catch(erro => this.error.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTitulo() {
    this.title.setTitle('Editar Lancamento ' + this.lancamento.descricao);
  }
}
