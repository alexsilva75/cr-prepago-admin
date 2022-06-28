<template>
  <input @focus="onFocus" @blur="onBlur" ref="currencyInput" type="currency" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["onInputBlur"]);

const currencyInput = ref<HTMLInputElement | null>(null);

const currency = "BRL"; // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

function localStringToNumber(s) {
  return Number(String(s).replace(/[^0-9.-]+/g, ""));
}

function onFocus() {
  const value = currencyInput.value!.value;
  currencyInput.value!.value = value ? "" + localStringToNumber(value) : "";
}

function onBlur() {
  const value = currencyInput.value!.value;

  const options = {
    maximumFractionDigits: 2,
    currency: currency,
    style: "currency",
    currencyDisplay: "symbol",
  };

  currencyInput.value!.value =
    value || value === "0"
      ? localStringToNumber(value).toLocaleString(undefined, options)
      : "";

  //console.log("Currency Value: ", currencyInput.value!.value);

  emit("onInputBlur", currencyInput.value!.value);
}

onMounted(() => {
  onBlur();
});
</script>
