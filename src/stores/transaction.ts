import { useAuthStore } from "./auth";
import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";

interface Dictionary {
  [key: string]: string;
}

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    openTransactionsCount: 0,
    paidTransactionsCount: 0,
    unpaidTransactionsCount: 0,
    ///openTransactions: [],
    filteredTransactions: [],
    brPaymentModes: {
      banking_billet: "Boleto Bancário",
      credit_card: "Cartão de Crédito",
    },
    brTransactionStatus: {
      waiting: "Aberta",
      paid: "Confirmada",
      unpaid: "Não Paga",
    },
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

    async loadActiveTransactions() {
      const authStore = useAuthStore();

      const baseURL = options.baseURL;

      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/transacao?conditions=gn_status:=:waiting`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.filteredTransactions = response.data.data.data;

      console.log("Open Transactions: ", this.filteredTransactions);
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
  },
});
