<template>
  <div class="row justify-content-end">
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box mb-3">
        <span class="info-box-icon bg-success elevation-1">
          <RouterLink to="/quota-products/new">
            <i class="fas fa-plus"> </i>
          </RouterLink>
        </span>

        <div class="info-box-content">
          <span class="info-box-text">Novo</span>
          <span class="info-box-text">Pacote</span>
        </div>
        <!-- /.info-box-content -->
      </div>
      <!-- /.info-box -->
    </div>
  </div>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Pacotes de Dados</h3>

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
            <th>Pacote</th>
            <th>Descrição</th>
            <th>Cota em Bytes</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="quota.id" v-for="quota in quotaProducts">
            <td>{{ quota.label }}</td>
            <td>{{ quota.description }}</td>
            <td>{{ quota.byte_quota }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useQuotaProductStore } from "@/stores/quota-product";

const quotaProductStore = useQuotaProductStore();

const { quotaProducts } = storeToRefs(quotaProductStore);

onMounted(async () => {
  await quotaProductStore.loadProductPackets();
});
</script>
