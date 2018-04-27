import { Pessoa } from './../core/model';
import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }

  pesquisar(nome: string): Promise<any> {

    console.log('pesquisar ' + nome);


   const param = new URLSearchParams();

    if (nome) {
      param.set('nome', nome);
    }

    return this.http.get(`${this.pessoaUrl}`,
      { search: param })
      .toPromise()
      .then(response => {

        const responseJson = response.json();

        const resultado = {
          pessoas: responseJson,
        };
        return resultado;
      });
  }

  listarTodas() {

    return this.http.get(`${this.pessoaUrl}?resumo`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  alteraStatus(codigo: number, status: boolean): Promise<void> {

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, status)
      .toPromise()
      .then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(`${this.pessoaUrl}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atulizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const pessoaAlterado = response.json() as Pessoa;
        return pessoaAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const param = new URLSearchParams();

    param.set('codigo', codigo.toString());

    return this.http.get(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;
        return pessoa;
      });
  }
}
