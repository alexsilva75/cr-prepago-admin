<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Últimas Transações</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px">
              <input
                type="text"
                name="table_search"
                class="form-control float-right"
                placeholder="Search"
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
        <div v-if="!isLoading" class="card-body table-responsive p-0">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Valor</th>
                <th>Realizada</th>
                <th>Forma de Pagamento</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="transaction.gn_charge_id"
                v-for="transaction in filteredTransactions"
              >
                <td>{{ transaction.gn_charge_id }}</td>
                <td>{{ transaction.username }}</td>
                <td>{{ formatPrice(transaction.gn_total) }}</td>
                <td>
                  {{
                    moment(transaction.created_at).format("DD/MM/YYYY  h:mm:ss")
                  }}
                </td>
                <td>
                  {{
                    transactionStore.brPaymentModes[
                      transaction.payment_mode as string
                    ]
                  }}
                </td>
                <td>
                  <span class="tag tag-success">{{
                    transactionStore.brTransactionStatus[transaction.gn_status]
                  }}</span>
                </td>
                <td>
                  <RouterLink
                    :to="{
                      name: 'transactionDetail',
                      params: { transactionId: transaction.id as number},
                    }"
                    class="btn btn-info"
                    >Detalhes</RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <TheSpinner></TheSpinner>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import moment from "moment";
import "moment/locale/pt-br";
//import type Transaction from "../../models/Transaction";
// import MoneyFormat from "vue-money-format";

import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTransactionStore } from "@/stores/transaction";
import TheSpinner from "@/components/ui/TheSpinner.vue";

const props = defineProps({
  paymentStatus: { type: String, required: false },
});

const isLoading = ref(false);

const transactionStore = useTransactionStore();
//const openTransactions: any[] = [];
const { filteredTransactions } = storeToRefs(transactionStore);

onMounted(async () => {
  console.log("Mounting Transaction Search");
  isLoading.value = true;
  if (props.paymentStatus) {
    await transactionStore.loadTransactions(props.paymentStatus);
  } else {
    await transactionStore.loadTransactions("");
  }
  isLoading.value = false;
});

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
}
</script>
