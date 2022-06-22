import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";
import { useAuthStore } from "./auth";

export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    connectedCustomers: 0,
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async fetchConnectedCustomers() {
      const authStore = useAuthStore();
      const response = await axios.get(
        `${options.baseURL}/api/v1/customers/connected`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
    },
  },
});
