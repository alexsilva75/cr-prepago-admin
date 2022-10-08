<template>
  <div class="card">
    <div
      class="card-header"
      :class="{
        'bg-warning': transaction.gn_status === 'waiting',
        'bg-success': transaction.gn_status === 'paid',
      }"
    >
      <b>Realizada em: </b
      >{{ moment(transaction.created_at).format("DD/MM/YYYY  h:mm:ss") }}
    </div>
    <div class="card-body">
      <p class="card-text">
        <b>Cliente: </b> {{ transaction.cliente?.nome }}
        {{ transaction.cliente?.sobrenome }}
      </p>
      <p><b>Usuário: </b>{{ transaction.cliente?.username }}</p>
      <p class="card-text">
        <b>Forma de Pagamento: </b>
        {{ brPaymentModes[transaction.payment_mode as string] }}
      </p>
      <p>
        <b>Pacote Adquirido: </b>{{ transaction.quota / options.ONE_GIGA }}GB
      </p>
      <p class="card-text">
        <b>Status da Transação: </b
        >{{ brTransactionStatus[transaction.gn_status as string] }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

import moment from "moment";
import "moment/locale/pt-br";

import { useTransactionStore } from "../../stores/transaction";
import type Transaction from "../../models/Transaction";
import options from "../../globalOptions";

const props = defineProps({
  transactionId: {
    type: String,
    required: true,
  },
});

const transactionStore = useTransactionStore();

const {
  selectedTransaction: transaction,
  brPaymentModes,
  brTransactionStatus,
} = storeToRefs(transactionStore);

onMounted(async () => {
  await transactionStore.fetchSelectedTransaction(+props.transactionId);

  console.log("Selected Transaction: ", transaction.value);
});
</script>
