<template>
  <TheNavbar></TheNavbar>
  <TheSidebar :new-messages-count="newMessagesCount"></TheSidebar>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Painel de Controle</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <DashboardContentBase>
      <RouterView></RouterView>
    </DashboardContentBase>
  </div>
  <TheFooter></TheFooter>
  <!-- Control Sidebar -->
  <!-- <aside class="control-sidebar control-sidebar-dark"> -->
  <!-- Control sidebar content goes here -->
  <!-- </aside> -->
  <!-- /.control-sidebar -->
</template>

<script lang="ts" setup>
//import ActiveChatsListVue from "@/components/ActiveChatsList.vue";
import { onMounted, watch, provide } from "vue";
import TheNavbar from "../components/ui/TheNavbar.vue";
import TheSidebar from "../components/ui/TheSidebar.vue";
import TheFooter from "@/components/ui/TheFooter.vue";
import DashboardContentBase from "../components/DashboardContentBase.vue";
import { useMessageStore } from "@/stores/messages";
import { storeToRefs } from "pinia";

const messageStore = useMessageStore();
const { newMessagesCount } = storeToRefs(messageStore);
onMounted(async () => {
  //
  await messageStore.loadNewMessagesCount();
});

watch(newMessagesCount, (newValue) => {
  console.log("New Messages Count", newMessagesCount.value);
});

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
}

provide("formatPrice", formatPrice);
</script>
