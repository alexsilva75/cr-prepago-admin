<template>
  <!-- general form elements -->
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="card-title">Novo Pacote de Dados</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->
    <form @submit.prevent="submitForm">
      <div class="card-body">
        <div class="form-group">
          <label for="exampleInputEmail1">Rótulo do Pacote</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Ex.: 2GB"
            v-model="formInputs.label"
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
            v-model="formInputs.price"
            @on-input-blur="setPrice"
          ></CurrencyInput>
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
          <label for="exampleInputFile">Descrição</label>
          <textarea
            class="form-control"
            name=""
            id=""
            cols="30"
            rows="3"
            v-model="formInputs.description"
          ></textarea>
        </div>
      </div>
      <!-- /.card-body -->

      <div class="card-footer">
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </div>
  <!-- /.card -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";
import { useQuotaProductStore } from "@/stores/quota-product";
import CurrencyInput from "../../components/ui/CurrencyInput.vue";

const quotaProductStore = useQuotaProductStore();
const router = useRouter();
const toast = useToast();

const formInputs = ref({
  label: "",
  description: "",
  byte_quota: 0,
  price: "",
});
async function submitForm() {
  console.log("Form Values: ", formInputs);
  parsePriceDouble(formInputs.value.price);

  try {
    await quotaProductStore.saveNewQuota({
      ...formInputs.value,
      price: parsePriceDouble(formInputs.value.price),
      byte_quota: formInputs.value.byte_quota * 1000000000,
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
  formInputs.value.price = price;
}

function parsePriceDouble(stringPrice: string) {
  let price = stringPrice.substring(2); //Removes 'R$'
  price = price.replace(",", ".");

  return Number.parseFloat(price);
}
</script>
