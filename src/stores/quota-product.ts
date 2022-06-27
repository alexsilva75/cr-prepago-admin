import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";
import options from "../globalOptions";
import type QuotaProduct from "@/models/QuotaProduct";
export const useQuotaProductStore = defineStore({
  id: "productPacket",
  state: () => ({
    quotaProducts: [] as QuotaProduct[],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async loadProductPackets() {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/transacao/quota-products`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.quotaProducts = response.data.quota_products;
    },

    async saveNewQuota(quota: any) {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.post(
        `${baseURL}/api/v1/transacao/quota-products`,
        quota,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    },
  },
});
