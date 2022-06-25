import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import axios from "axios";
import options from "../globalOptions";

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    newMessagesCount: 0,
    newMessages: [],
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
    async loadNewMessages() {
      const authStore = useAuthStore();
      const response = await axios.get(
        `${options.baseURL}/api/v1/messages?conditions=destinatario:=:suporte@portalcrtelecom.com.br;status:=:UNREAD`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      this.newMessages = response.data.messages;

      console.log("messages", this.newMessages);
    },

    async loadNewMessagesCount() {
      const authStore = useAuthStore();
      const response = await axios.get(
        `${options.baseURL}/api/v1/messages/count-new?conditions=destinatario:=:suporte@portalcrtelecom.com.br;status:=:UNREAD`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      this.newMessagesCount = response.data.newMessages;

      console.log("new messages COUNT", this.newMessages);
    },
  },
});
