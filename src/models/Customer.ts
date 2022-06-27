import type Transaction from "./Transaction";
export default interface Customer {
  id: number;
  nome: string;
  sobrenome: string;
  created_at: string;
  endereco: string;
  transactions?: Transaction[];
}
