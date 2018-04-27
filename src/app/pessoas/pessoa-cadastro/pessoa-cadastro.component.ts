import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from './../../core/error.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private error: ErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Lancamento');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }


  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    console.log(this.pessoa);
    this.pessoaService.salvar(this.pessoa)
      .then(pessoaAdicionado => {
        this.toasty.success('Pessoa salvo com sucesso');
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/pessoas', pessoaAdicionado.codigo]);
      })
      .catch(erro => this.error.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    console.log(this.pessoa);
    this.pessoaService.atulizar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa atualizada com sucesso');
        this.pessoa = pessoa;
        this.atualizarNome();
      })
      .catch(erro => this.error.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.pessoa = lancamento;
        this.atualizarNome();
      })
      .catch(erro => this.error.handle(erro));
  }


  atualizarNome() {
    this.title.setTitle('Editar Pessoa: ' + this.pessoa.nome);
  }

}
