import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";
import options from "../globalOptions";
import type QuotaProduct from "@/models/QuotaProduct";
export const useQuotaProductStore = defineStore({
  id: "productPacket",
  state: () => ({
    quotaProducts: [] as QuotaProduct[],
    selectedQuota: {} as QuotaProduct,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async loadProductPackets() {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.get(`${baseURL}/api/v1/quota-products`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      this.quotaProducts = response.data.quota_products.data;

      console.log("Quota Products: ", this.quotaProducts);
    },

    async saveNewQuota(quota: any) {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.post(
        `${baseURL}/api/v1/quota-products`,
        quota,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    },

    async fetchSelectedQuota(quotaId: number) {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/quota-products/${quotaId}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Selected Quota: ", response);

      this.selectedQuota = response.data.quota_product;
    },
    async updateQuota(quota: QuotaProduct) {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.put(
        `${baseURL}/api/v1/quota-products/${quota.id}`,
        quota,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("UPDATE RESPONSE: ", response);
    },
  },
});
