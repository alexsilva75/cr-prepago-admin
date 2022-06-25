<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex flex-wrap">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">A</a></li>
      <li class="page-item"><a class="page-link" href="#">B</a></li>
      <li class="page-item"><a class="page-link" href="#">C</a></li>
      <li class="page-item"><a class="page-link" href="#">D</a></li>
      <li class="page-item"><a class="page-link" href="#">E</a></li>
      <li class="page-item"><a class="page-link" href="#">F</a></li>
      <li class="page-item"><a class="page-link" href="#">G</a></li>
      <li class="page-item"><a class="page-link" href="#">H</a></li>
      <li class="page-item"><a class="page-link" href="#">I</a></li>
      <li class="page-item"><a class="page-link" href="#">J</a></li>
      <li class="page-item"><a class="page-link" href="#">K</a></li>
      <li class="page-item"><a class="page-link" href="#">L</a></li>
      <li class="page-item"><a class="page-link" href="#">M</a></li>
      <li class="page-item"><a class="page-link" href="#">N</a></li>
      <li class="page-item"><a class="page-link" href="#">O</a></li>
      <li class="page-item"><a class="page-link" href="#">P</a></li>
      <li class="page-item"><a class="page-link" href="#">Q</a></li>
      <li class="page-item"><a class="page-link" href="#">R</a></li>
      <li class="page-item"><a class="page-link" href="#">S</a></li>
      <li class="page-item"><a class="page-link" href="#">T</a></li>
      <li class="page-item"><a class="page-link" href="#">U</a></li>
      <li class="page-item"><a class="page-link" href="#">V</a></li>
      <li class="page-item"><a class="page-link" href="#">W</a></li>
      <li class="page-item"><a class="page-link" href="#">X</a></li>
      <li class="page-item"><a class="page-link" href="#">Y</a></li>
      <li class="page-item"><a class="page-link" href="#">Z</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>

  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Responsive Hover Table</h3>

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
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in filteredCustomers">
                <td>{{ customer.id }}</td>
                <td>{{ customer.nome + " " + customer.sobrenome }}</td>
                <td>{{ customer.created_at }}</td>
                <td><span class="tag tag-success">Approved</span></td>
                <td>
                  {{ customer.endereco }}
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
import { onMounted } from "vue";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";

const customerStore = useCustomerStore();

const { filteredCustomers } = storeToRefs(customerStore);

onMounted(async () => {
  await customerStore.loadFilteredCustomers();
});
</script>
