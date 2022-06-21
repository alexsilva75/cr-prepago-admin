import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    openTransactionsCount: 0,
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

      this.openTransactionsCount = response.data.data;
    },
  },
});
