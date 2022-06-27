<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex flex-wrap">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :key="letter" v-for="letter in alphabet">
        <a
          class="page-link"
          @click.prevent="setSelectedLetter(letter)"
          href="#"
          >{{ letter }}</a
        >
      </li>

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
                <th>Cliente</th>
                <th>Registro</th>
                <th>Endereço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr :key="customer.id" v-for="customer in filteredCustomers">
                <td>{{ customer.id }}</td>
                <td>{{ customer.nome + " " + customer.sobrenome }}</td>
                <td>{{ customer.created_at }}</td>
                <td>
                  {{ customer.endereco }}
                </td>
                <td>
                  <RouterLink
                    class="btn btn-info"
                    :to="{
                      name: 'customerDetail',
                      params: { customerId: customer.id },
                    }"
                    >Detalhes</RouterLink
                  >
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
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const customerStore = useCustomerStore();

const { filteredCustomers, selectedLetter } = storeToRefs(customerStore);

onMounted(async () => {
  await customerStore.loadFilteredCustomers();
});

watch(selectedLetter, (_) => {
  customerStore.loadFilteredCustomers();
});

function setSelectedLetter(letter: string) {
  selectedLetter.value = letter;
}
</script>
