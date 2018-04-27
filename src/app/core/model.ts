export class Categoria {
  codigo: number;
}

export class Pessoa {
  codigo: number;
  endereco = new Endereco();
  nome: string;
  ativo = true;
}

export class Endereco {
  codigo: number;
  logradouro: number;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimeto: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
