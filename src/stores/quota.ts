import { defineStore } from "pinia";
import axios from "axios";
import options from "../globalOptions";
import { useAuthStore } from "./auth";

export const useQuotaStore = defineStore({
  id: "quota",
  state: () => ({
    lowQuotaUsers: [] as any[],
    updatedUsers: 0,
  }),
  getters: {
    doubleCount: () => 0,
  },
  actions: {
    async fetchLowQuotaUsers() {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.get(
        `${baseURL}/api/v1/quota-actions/low-quota-users`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Low Quota Users: ", response);
      if (response) {
        this.lowQuotaUsers = response.data.users;
      }
    },

    async renewUsersQuota() {
      const authStore = useAuthStore();
      const baseURL = options.baseURL;
      const token = authStore.token;

      const response = await axios.put(
        `${baseURL}/api/v1/quota-actions/daily-update`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Update Users: ", response);
      if (response) {
        this.updatedUsers = response.data.updatedUsers;
        //console.log("Updated Users in the Store", this.updatedUsers);
      }
      //console.log("End updating users");
    },
  },
});
