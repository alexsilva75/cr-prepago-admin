<template>
  <div class="row">
    <div class="col-md-3">
      <a href="compose.html" class="btn btn-primary btn-block mb-3"
        >Nova Mensagem</a
      >

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Pastas</h3>

          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-inbox"></i> Caixa de Entrada
                <span class="badge bg-primary float-right">{{
                  newMessagesCount
                }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-envelope"></i> Enviadas
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-envelope-open"></i> Lidas
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-trash-alt"></i> Lixeira
              </a>
            </li>
          </ul>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
    <MailBox :messages="(newMessages as Message[])"></MailBox>
  </div>
  <!-- /.row -->
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import MailBox from "@/components/MailBox.vue";
import type Message from "@/models/Message";

import { useMessageStore } from "@/stores/messages";

const messageStore = useMessageStore();

const { newMessages, newMessagesCount } = storeToRefs(messageStore);

onMounted(async () => {
  await messageStore.loadNewMessages();
});
</script>
