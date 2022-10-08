import type Transaction from "./Transaction";
export default interface Customer {
  id: number;
  nome: string;
  sobrenome: string;
  username?: string;
  created_at: string;
  endereco: string;
  transactions?: Transaction[];
  bairro?: string;
  telefone1?: string;
  telefone2?: string;
  telefone3?: string;
}
