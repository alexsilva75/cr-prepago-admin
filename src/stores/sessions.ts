import { defineStore } from "pinia";
import axios from "axios";
import options from "@/globalOptions";

interface Session {
  username: string;
  radacctid: number;
  acctsessionid: string;
  acctstarttime: Date;
  acctinputoctets: number;
  acctoutputoctets: number;
}

interface State {
  activeSessions: Session[];
  isLoading: boolean;
  disconnectError: string;
  isDisconnectingUser: boolean;
}
export const useSessionsStore = defineStore({
  id: "sessions",
  state: () =>
    ({
      activeSessions: [],
      isLoading: false,
      disconnectError: "",
      isDisconnectingUser: false,
    } as State),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    async loadActiveSessions() {
      this.isLoading = true;
      const response = await axios.get(
        `${options.baseURL}/api/v1/acct/sessions`
      );

      console.log("Active Connections: ", response.data.connections);
      this.activeSessions = response.data.connections;
      this.isLoading = false;
    },

    async disconnectUser(sessionId: string) {
      this.disconnectError = "";
      this.isDisconnectingUser = true;
      const response = await axios.get(
        `${options.baseURL}/api/v1/acct/disconnect?sessionId=${sessionId}`
      );

      if ("errorMessage" in response) {
        this.disconnectError = "Falha ao desconectar o usuário.";
      } else {
        this.loadActiveSessions();
      }
      this.isDisconnectingUser = false;
    },
  },
});
