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
        <div class="card-body table-responsive p-0">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="transaction.gn_charge_id"
                v-for="transaction in (filteredTransactions as any[])"
              >
                <td>{{ transaction.gn_charge_id }}</td>
                <td>{{ transaction.username }}</td>
                <td>{{ transaction.gn_total }}</td>
                <td>{{ transaction.created_at }}</td>
                <td>
                  <span class="tag tag-success">{{
                    transaction.gn_status
                  }}</span>
                </td>
                <td>
                  <button class="btn btn-info">Detalhes</button>
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
</template>
<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useTransactionStore } from "@/stores/transaction";

const transactionStore = useTransactionStore();
//const openTransactions: any[] = [];
const { filteredTransactions } = storeToRefs(transactionStore);

onMounted(async () => {
  await transactionStore.loadActiveTransactions();
  console.log("Loaded transactions", filteredTransactions);
});

watch(filteredTransactions, (newValue) => {
  console.log("New Transactions: ", newValue);
});
</script>
