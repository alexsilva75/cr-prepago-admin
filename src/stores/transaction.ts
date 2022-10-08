import { useAuthStore } from "./auth";
import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";
import type Transaction from "../models/Transaction";

interface Dictionary {
  [key: string]: string;
}

// interface TransactionState {
//   openTransactionsCount: number;
//   paidTransactionsCount: number;
//   unpaidTransactionsCount: number;

//   filteredTransactions: Transaction[];
//   activeTransactions: Transaction[];
//   selectedTransaction: Transaction;
//   brPaymentModes: {
//     banking_billet: string;
//     credit_card: string;
//   };
//   brTransactionStatus: {
//     waiting: string;
//     paid: string;
//     unpaid: string;
//   };
// }

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    openTransactionsCount: 0,
    paidTransactionsCount: 0,
    unpaidTransactionsCount: 0,
    ///openTransactions: [] as Transaction[],
    filteredTransactions: [] as Transaction[],
    activeTransactions: [] as Transaction[],
    selectedTransaction: {} as Transaction | any,
    brPaymentModes: {
      banking_billet: "Boleto Bancário",
      credit_card: "Cartão de Crédito",
    } as Dictionary,
    brTransactionStatus: {
      waiting: "Aberta",
      paid: "Confirmada",
      unpaid: "Não Paga",
    } as Dictionary,
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },

    async fetchOpenTransactionsCount() {
      const response = await axios.get(
        `${options.baseURL}/api/v1/transacoes/count`
      );

      console.log("Transactions count Response: ", response);

      this.openTransactionsCount = response.data.data.waitingTransactions;
      this.paidTransactionsCount = response.data.data.paidTransactions;
      this.unpaidTransactionsCount = response.data.data.unpaidTransactions;
    },

    async loadTransactions(status: string) {
      const authStore = useAuthStore();

      const baseURL = options.baseURL;

      const token = authStore.token;

      let url = `${baseURL}/api/v1/transacao`;
      if (status) {
        url += `?conditions=gn_status:=:${status}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      this.filteredTransactions = response.data.data.data;

      console.log("Open Transactions: ", this.filteredTransactions);
    },
    async loadActiveTransactions() {
      const authStore = useAuthStore();

      const baseURL = options.baseURL;

      const token = authStore.token;

      const url = `${baseURL}/api/v1/transacao?conditions=gn_status:=:waiting`;

      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      this.activeTransactions = response.data.data.data;

      console.log("Open Transactions: ", this.activeTransactions);
    },

    async queryTransactions(payload: any) {
      const baseURL = options.baseURL;

      const authStore = useAuthStore();
      const token = authStore.token;

      // Expected conditions format: conditions=gn_status:=:waiting
      const { conditions } = payload;

      let url = `${baseURL}/api/v1/transacao`;

      if (conditions) {
        url += `?conditions=${conditions}`;
      }

      //console.log("URL: ", url);
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const transactions = response.data.data;
      this.filteredTransactions = transactions;
    },
    async queryActiveTransaction(params: any) {
      const baseURL = options.baseURL;

      const authStore = useAuthStore();
      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/transacao/${params.charge_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const activeTransactions = this.filteredTransactions;

      const transactionIndex = activeTransactions.findIndex(
        (trans: any) => trans.gn_charge_id === params.charge_id
      );

      const transaction = activeTransactions[transactionIndex] as any;

      if (transaction) {
        if (transaction.gn_status !== response.data.data.data.status) {
          this.changeTransactionStatus(
            transaction.id,
            transaction.charge_id,
            response.data.data.data.status
          );
        }
      }
    }, ////
    async changeTransactionStatus(
      transactionId: number,
      chargeId: number,
      status: string
    ) {
      const baseURL = options.baseURL;

      const authStore = useAuthStore();
      const token = authStore.token;

      await axios.post(
        `${baseURL}/api/v1/transacao/${transactionId}`,
        {
          chargeId,
          gn_status: status,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //this.loadActiveTransactions();
    },
    async fetchSelectedTransaction(transactionId: number) {
      const baseURL = options.baseURL;

      const authStore = useAuthStore();
      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/transacao/${transactionId}/detail`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.selectedTransaction = response.data.transaction;
      // this.selectedTransaction.cliente = response.data.transaction.cliente;
      console.log("Selected transaction", this.selectedTransaction);
    },
  },
});
