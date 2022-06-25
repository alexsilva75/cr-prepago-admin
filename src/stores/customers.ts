import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";
import { useAuthStore } from "./auth";

export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    connectedCustomers: 0,
    selectedLetter: "A",
    filteredCustomers: [],
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

    async loadFilteredCustomers() {
      const authStore = useAuthStore();

      const response = await axios.get(
        `${options.baseURL}/api/v1/customers?conditions=nome:like:${this.selectedLetter}%`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      this.filteredCustomers = response.data.clientes;
      console.log("Filtered Customers: ", this.filteredCustomers);
    },
  },
});
