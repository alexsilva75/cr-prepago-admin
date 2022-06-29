<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="submitForm">
          <div class="modal-header">
            <h4 class="modal-title">Alterar Quota</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- form start -->

            <div class="card-body">
              <div class="form-group">
                <label for="exampleInputEmail1">Rótulo do Pacote</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Ex.: 2GB"
                  v-model="editQuota.label"
                />
              </div>
              <div class="form-group">
                <label for="price">Preço</label>
                <!-- <input
            type="min"
            min="0.00"
            class="form-control"
            id="price"
            v-model="formInputs.price"
          /> -->
                <CurrencyInput
                  class="form-control"
                  v-model="editQuota.price"
                  @on-input-blur="setPrice"
                ></CurrencyInput>
              </div>
              <div class="form-group">
                <label for="quota">Cota (em GB)</label>
                <input
                  type="number"
                  class="form-control"
                  id="quota"
                  v-model="editQuota.byte_quota"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputFile">Descrição</label>
                <textarea
                  class="form-control"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                  v-model="editQuota.description"
                ></textarea>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Fechar
            </button>
            <button type="submit" @click="submitForm" class="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";
import { useQuotaProductStore } from "@/stores/quota-product";
import CurrencyInput from "../../components/ui/CurrencyInput.vue";
import type QuotaProduct from "@/models/QuotaProduct";
const quotaProductStore = useQuotaProductStore();
const router = useRouter();
const toast = useToast();

interface Props {
  editQuota: QuotaProduct;
}

const props = defineProps<Props>();
const quotaPrice = ref("");

// const formInputs = ref({
//   label: "",
//   description: "",
//   byte_quota: 0,
//   price: "",
// });
async function submitForm() {
  console.log("Form Values: ", props.editQuota);
  //parsePriceDouble(props.editQuota.price);

  try {
    await quotaProductStore.saveNewQuota({
      ...props.editQuota,
      price: parsePriceDouble(quotaPrice.value),
      byte_quota: props.editQuota.byte_quota * 1000000000,
    });

    toast("Novo Pacote de Dados foi salvo com sucesso!", {
      type: TYPE.SUCCESS, // or "success", "error", "default", "info" and "warning"
    });
    router.push("/quota-products");
  } catch (error) {
    toast("Erro ao tentar salvar registro", {
      type: TYPE.ERROR, // or "success", "error", "default", "info" and "warning"
    });
    console.log("Error: ", error);
  }
}

function setPrice(price: string) {
  quotaPrice.value = price;
}

function parsePriceDouble(stringPrice: string) {
  let price = stringPrice.substring(2); //Removes 'R$'
  price = price.replace(",", ".");

  return Number.parseFloat(price);
}
</script>
