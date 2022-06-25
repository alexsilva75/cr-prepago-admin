// export default class Transaction {
//   constructor(
//     public gn_charge_id: number,
//     public username: string,
//     public gn_total: number,
//     public created_at: string,
//     public gn_status: string
//   ) {}
// }

export default interface Transaction {
  gn_charge_id: number;
  username: string;
  gn_total: number;
  created_at: string;
  gn_status: string;
  payment_mode?: string;
}
