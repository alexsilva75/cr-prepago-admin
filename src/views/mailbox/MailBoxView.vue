<template>
  <div class="row">
    <div class="col-md-3">
      <RouterLink to="/compose" class="btn btn-primary btn-block mb-3"
        >Nova Mensagem</RouterLink
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
              <RouterLink to="/inbox/UNREAD" class="nav-link">
                <i class="fas fa-inbox"></i> Caixa de Entrada
                <span class="badge bg-primary float-right">{{
                  newMessagesCount
                }}</span>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/inbox/SENT" class="nav-link">
                <i class="far fa-envelope"></i> Enviadas
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/inbox/READ" class="nav-link">
                <i class="far fa-envelope-open"></i> Lidas
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/inbox/DELETED" class="nav-link">
                <i class="far fa-trash-alt"></i> Lixeira
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
    <!-- <component
      :is="displayComponents[currentComponent]"
      v-bind="currentProperties"
    ></component> -->

    <RouterView></RouterView>
  </div>
  <!-- /.row -->
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useMessageStore } from "@/stores/messages";

const messageStore = useMessageStore();

const { newMessagesCount } = storeToRefs(messageStore);
</script>
