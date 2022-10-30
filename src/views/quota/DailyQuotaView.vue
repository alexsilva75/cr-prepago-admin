<template>
  <div>Usuários Gratuitos: {{ lowQuotaUsersAmount }}</div>
  <div>
    <button @click="renewQuota" class="btn btn-primary">
      Renovar Cota Diária dos Usuários Gratuitos
    </button>
  </div>

  <hr />
  <p>{{ updateMessage }}</p>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useQuotaStore } from "@/stores/quota";
import { storeToRefs } from "pinia";

const quotaStore = useQuotaStore();

const { lowQuotaUsers, updatedUsers } = storeToRefs(quotaStore);

const lowQuotaUsersAmount = ref(0);
const updateMessage = ref("");

async function updateQuotaData() {
  await quotaStore.fetchLowQuotaUsers();
  lowQuotaUsersAmount.value = lowQuotaUsers.value.length;
}

onMounted(async () => {
  await updateQuotaData();
});

async function renewQuota() {
  await quotaStore.renewUsersQuota();
  await updateQuotaData();
}

watch(
  () => quotaStore.updatedUsers,
  (newValue) => {
    console.log("Updated Users Watcher: ", newValue);
    updateMessage.value = `${newValue} Usuários atualizados.`;
  }
);
</script>
