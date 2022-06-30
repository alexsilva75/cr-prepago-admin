<template>
  <input
    @focus="onFocus"
    :value="formatInitialValue()"
    @blur="onBlur"
    ref="currencyInput"
    type="currency"
  />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

//let inputValue = ref("");

const props = defineProps({
  initialValue: String,
});
const emit = defineEmits(["onInputBlur"]);

const currencyInput = ref<HTMLInputElement | null>(null);

const currency = "BRL"; // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

function localStringToNumber(s: string) {
  return Number(String(s).replace(/[^0-9.-]+/g, ""));
}

function onFocus() {
  const value = currencyInput.value!.value;
  currencyInput.value!.value = value ? "" + localStringToNumber(value) : "";
}

function onBlur() {
  const value = currencyInput.value!.value; //.replace(",", ".");

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

  //return currencyInput.value!.value
}

function formatInitialValue() {
  const value = props.initialValue ? props.initialValue : ""; //.replace(",", ".");

  const options = {
    maximumFractionDigits: 2,
    currency: currency,
    style: "currency",
    currencyDisplay: "symbol",
  };

  const returnValue =
    value || value === "0"
      ? localStringToNumber(value).toLocaleString(undefined, options)
      : "";

  //console.log("Currency Value: ", currencyInput.value!.value);

  //emit("onInputBlur", currencyInput.value!.value);
  return returnValue;
}

onMounted(() => {
  onBlur();

  // if (props.initialValue) {
  //   inputValue = props.initialValue;
  // }
});
</script>
