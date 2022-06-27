<template>
  <input ref="inputRef" type="text" />
</template>
<script lang="ts" setup>
import { useCurrencyInput } from "vue-currency-input";
import type { CurrencyInputOptions } from "vue-currency-input";

const props = defineProps({
  modelValue: Number, // Vue 2: value
  options: Object,
});

const { inputRef } = useCurrencyInput(props.options as CurrencyInputOptions);
</script>
