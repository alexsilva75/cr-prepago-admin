<template>
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <!-- Profile Image -->
          <div class="card card-primary card-outline">
            <div class="card-body box-profile">
              <div class="text-center">
                <!-- <img
                  class="profile-user-img img-fluid img-circle"
                  src="../../dist/img/user4-128x128.jpg"
                  alt="User profile picture"
                /> -->
                <span class="display-3">
                  <i class="fas fa-user"></i>
                </span>
              </div>

              <h3 class="profile-username text-center">
                {{ selectedCustomer.nome }}
              </h3>

              <p class="text-muted text-center">
                Cliente desde:
                {{ moment(selectedCustomer.created_at).format("DD/MM/YYYY") }}
              </p>

              <ul class="list-group list-group-unbordered mb-3">
                <li class="list-group-item">
                  <b>Usuário</b>
                  <a class="float-right">{{ selectedCustomer.username }}</a>
                </li>
                <!-- <li class="list-group-item">
                  <b>Following</b> <a class="float-right">543</a>
                </li>
                <li class="list-group-item">
                  <b>Friends</b> <a class="float-right">13,287</a>
                </li> -->
              </ul>

              <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="card">
            <div class="card-header p-2">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#activity" data-toggle="tab"
                    >Pessoal</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#timeline" data-toggle="tab"
                    >Compras</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#settings" data-toggle="tab"
                    >Conta</a
                  >
                </li>
              </ul>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="active tab-pane" id="activity">
                  <p>
                    <b>Nome: </b>{{ selectedCustomer.nome }}
                    {{ selectedCustomer.sobrenome }}
                  </p>
                  <p><b>Endereço:</b> {{ selectedCustomer.endereco }}</p>
                  <p><b>Bairro:</b> {{ selectedCustomer.bairro }}</p>
                  <p>
                    <b>Telefone(s):</b> {{ selectedCustomer.telefone1 }} <br />
                    {{ selectedCustomer.telefone2 }} <br />
                    {{ selectedCustomer.telefone3 }}
                  </p>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="timeline">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">Últimas Compras</h3>

                      <div class="card-tools"></div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style="width: 10px">#</th>
                            <th>Data</th>
                            <th>Pacote</th>
                            <th style="width: 40px">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            :key="transaction.id"
                            v-for="transaction in selectedCustomer.transactions"
                          >
                            <td>{{ transaction.gn_charge_id }}</td>
                            <td>
                              {{
                                moment(transaction.created_at).format(
                                  "DD/MM/YYYY"
                                )
                              }}
                            </td>
                            <td>
                              {{ transaction.quota / options.ONE_GIGA }}GB
                            </td>
                            <td>
                              <span
                                :class="{
                                  'bg-success':
                                    transaction.gn_status === 'paid',
                                  'bg-warning':
                                    transaction.gn_status === 'waiting',
                                  'bg-danger':
                                    transaction.gn_status === 'unpaid',
                                }"
                                class="badge"
                              >
                                {{ brTransactionStatus[transaction.gn_status] }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- /.card-body -->
                  </div>
                  <!-- /.card -->
                </div>
                <!-- /.tab-pane -->

                <div class="tab-pane" id="settings"></div>
                <!-- /.tab-pane -->
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</template>
<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import * as moment from "moment";
import "moment/locale/pt-br";

import { useTransactionStore } from "@/stores/transaction";
import options from "../../globalOptions";

const customerStore = useCustomerStore();
const transactionStore = useTransactionStore();

const { brTransactionStatus } = transactionStore;

const { selectedCustomer } = storeToRefs(customerStore);

const route = useRoute();

onMounted(async () => {
  await customerStore.fetchSelectedCustomer(+route.params.customerId);
});

watch(
  () => route.params.customerId,
  (newCustomerId) => {
    update();
  }
);

const update = async () => {
  await customerStore.fetchSelectedCustomer(+route.params.customerId);
};
</script>
