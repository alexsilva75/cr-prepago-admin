<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div v-if="isSaving" class="modal-content">
        <TheSpinner></TheSpinner>
      </div>
      <div v-else class="modal-content">
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
                <label for="label">Rótulo do Pacote</label>
                <input
                  type="text"
                  class="form-control"
                  id="label"
                  placeholder="Ex.: 2GB"
                  v-model="formInputs.label"
                />
              </div>
              <div class="form-group">
                <label for="price">Preço</label>

                <!-- <CurrencyInput
                  class="form-control"
                  v-model="formInputs.price"
                  :initial-value="formInputs.price"
                  id="price"
                  @on-input-blur="setPrice"
                ></CurrencyInput> -->

                <!-- <input
                  class="form-control"
                  v-model="formInputs.price"
                  type="number"
                  min="0.00"
                  id="price"
                /> -->
                <money3
                  class="form-control"
                  v-model="formInputs.price"
                  v-bind="config"
                  id="price"
                ></money3>
              </div>
              <div class="form-group">
                <label for="quota">Cota (em GB)</label>
                <input
                  type="number"
                  class="form-control"
                  id="quota"
                  v-model="formInputs.byte_quota"
                />
              </div>
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea
                  class="form-control"
                  id="description"
                  cols="30"
                  rows="3"
                  v-model="formInputs.description"
                ></textarea>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <div class="modal-footer justify-content-between">
            <button
              id="closeButton"
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
            >
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
import { ref, onMounted, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";
import { useQuotaProductStore } from "@/stores/quota-product";
// import CurrencyInput from "../../components/ui/CurrencyInput.vue";
import type QuotaProduct from "@/models/QuotaProduct";
import TheSpinner from "../ui/TheSpinner.vue";

const quotaProductStore = useQuotaProductStore();
const router = useRouter();
const toast = useToast();

let isSaving = false;

const config = {
  prefix: "R$",
  suffix: "",
  thousands: ".",
  decimal: ",",
  precision: 2,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
};

interface Props {
  editQuota: QuotaProduct;
}

const props = defineProps<Props>();
const quotaPrice = ref(0);

const formInputs = ref({
  id: 0,
  label: "",
  description: "",
  byte_quota: 0,
  price: "",
});

onMounted(() => {
  //formInputs.value = { ...props.editQuota, price: `${props.editQuota.price}` };
});

watch(props, (newProps: Props) => {
  formInputs.value = {
    ...newProps.editQuota,
    price: `${newProps.editQuota.price * 100}`,
    byte_quota: formatQuota(newProps.editQuota.byte_quota),
  };
  quotaPrice.value = newProps.editQuota.price;
  console.log("Changed");
});

async function submitForm() {
  console.log("Form Values: ", formInputs.value);
  //parsePriceDouble(props.editQuota.price);

  isSaving = true;
  try {
    await quotaProductStore.updateQuota({
      id: props.editQuota.id,
      label: formInputs.value.label,
      description: formInputs.value.description,
      price: Number.parseFloat(formInputs.value.price),
      byte_quota: formInputs.value.byte_quota * 1000000000,
    } as QuotaProduct);

    toast("O Pacote de Dados foi alterado com sucesso!", {
      type: TYPE.SUCCESS, // or "success", "error", "default", "info" and "warning"
    });

    const closeButtonEl = document.getElementById(
      "closeButton"
    )! as HTMLButtonElement;
    await quotaProductStore.loadProductPackets();
    closeButtonEl.click();
    isSaving = false;
    router.push("/quota-products");
  } catch (error) {
    toast("Erro ao tentar alterar registro", {
      type: TYPE.ERROR, // or "success", "error", "default", "info" and "warning"
    });
    console.log("Error: ", error);
    isSaving = false;
  }
}

function setPrice(price: string) {
  console.log("Setting the price: ", price);
  // quotaPrice.value = Number.parseFloat(price);
  formInputs.value.price = price;
}

function parsePriceDouble(stringPrice: string) {
  let price = stringPrice.substring(2); //Removes 'R$'
  price = price.replace(",", ".");

  return Number.parseFloat(price);
}

function formatQuota(quotaBytes: number) {
  return quotaBytes / 1000000000;
}

const formatPrice = inject("formatPrice");
</script>
