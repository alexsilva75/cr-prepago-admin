<template>
  <div class="row">
    <div class="col-12">
      <h1>Usuários Conectados</h1>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Clientes</h3>

              <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px">
                  <input
                    type="text"
                    name="table_search"
                    class="form-control float-right"
                    placeholder="Pesquisar"
                  />

                  <div class="input-group-append">
                    <button type="submit" class="btn btn-default">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Início da Sessão</th>
                    <th>Download</th>
                    <th>Upload</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="session.acctsessionid"
                    v-for="session in activeSessions"
                  >
                    <td>{{ session.username }}</td>
                    <td>{{ session.acctstarttime }}</td>
                    <td>{{ session.acctoutputoctets }}</td>
                    <td>
                      {{ session.acctinputoctets }}
                    </td>
                    <td>
                      <button
                        class="btn btn-info"
                        @click="onDisconnectUser(session.acctsessionid)"
                      >
                        Desconectar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useSessionsStore } from "@/stores/sessions";
import { storeToRefs } from "pinia";

const sessionsStore = useSessionsStore();
const { activeSessions } = storeToRefs(sessionsStore);
onMounted(async () => {
  await sessionsStore.loadActiveSessions();
});

async function onDisconnectUser(sessionId: string) {
  console.log("Disconnecting Session: ", sessionId);
  await sessionsStore.disconnectUser(sessionId);
}

watch(activeSessions, (newValue) => {
  console.log("Loaded new sessions");
});
</script>
