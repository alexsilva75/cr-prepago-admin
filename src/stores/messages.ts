import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import axios from "axios";
import options from "../globalOptions";
import type Message from "@/models/Message";

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    newMessagesCount: 0,
    newMessages: [] as Message[],
    filteredMessages: [] as Message[],
    selectedMessage: {} as Message,
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
    async loadNewMessages(messageStatus = "UNREAD") {
      const authStore = useAuthStore();
      const response = await axios.get(
        `${options.baseURL}/api/v1/messages?conditions=destinatario:=:suporte@portalcrtelecom.com.br;status:=:${messageStatus}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      this.filteredMessages = response.data.messages;

      console.log("messages", this.filteredMessages);
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

    async loadMessage(messageId: number) {
      const authStore = useAuthStore();
      const response = await axios.get(
        `${options.baseURL}/api/v1/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      this.selectedMessage = response.data.message;

      console.log("Selected Message", this.selectedMessage);
    },
    async sendMessage(message: Message) {
      const authStore = useAuthStore();
      const response = await axios.post(
        `${options.baseURL}/api/v1/messages/`,
        { ...message, sender_name: "Suporte CR Telecom" },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      console.log("Send message Response: ", response);
      if (response.status != 200) {
        throw new Error("Não foi possível enviar a mensagem.");
      }
    },
  },
});
