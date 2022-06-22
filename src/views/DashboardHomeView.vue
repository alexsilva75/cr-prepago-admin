<template>
  <!-- Small boxes (Stat box) -->
  <div class="row">
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-info">
        <div class="inner">
          <h3>{{ transactionStore.openTransactionsCount }}</h3>

          <p>Pedidos pendentes</p>
        </div>
        <div class="icon">
          <i class="ion ion-bag"></i>
        </div>
        <a href="#" class="small-box-footer"
          >Detalhes <i class="fas fa-arrow-circle-right"></i
        ></a>
      </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-success">
        <div class="inner">
          <h3>
            <!-- 53<sup style="font-size: 20px">%</sup> -->
            {{ transactionStore.paidTransactionsCount }}
          </h3>

          <p>Pedidos confirmados</p>
        </div>
        <div class="icon">
          <i class="ion ion-stats-bars"></i>
        </div>
        <a href="#" class="small-box-footer"
          >Detalhes <i class="fas fa-arrow-circle-right"></i
        ></a>
      </div>
    </div>
    <!-- ./col -->
    <!-- <div class="col-lg-3 col-6">
      
      <div class="small-box bg-warning">
        <div class="inner">
          <h3>44</h3>
          <p>Usuários ativos</p>
        </div>
        <div class="icon">
          <i class="ion ion-person-add"></i>
        </div>
        <a href="#" class="small-box-footer"
          >Detalhes <i class="fas fa-arrow-circle-right"></i
        ></a>
      </div>
    </div> -->
    <!-- ./col -->
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-danger">
        <div class="inner">
          <h3>{{ customerStore.connectedCustomers }}</h3>

          <p>Usuários conectados</p>
        </div>
        <div class="icon">
          <i class="ion ion-pie-graph"></i>
        </div>
        <a href="#" class="small-box-footer"
          >Detalhes <i class="fas fa-arrow-circle-right"></i
        ></a>
      </div>
    </div>
    <!-- ./col -->
  </div>
  <!-- /.row -->
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useTransactionStore } from "../stores/transaction";
import { useCustomerStore } from "@/stores/customers";

const transactionStore = useTransactionStore();
const customerStore = useCustomerStore();

onMounted(() => {
  transactionStore.fetchOpenTransactionsCount();
  customerStore.fetchConnectedCustomers();
});
</script>
<style></style>
