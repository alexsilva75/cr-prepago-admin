<template>
  <div class="modal fade" :id="props.targetId">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ props.title }}</h4>
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
          <slot></slot>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">
            Cancelar
          </button>
          <button type="button" @click="buttonAction" class="btn btn-primary">
            {{ buttonCaption }}
          </button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>
<script lang="ts" setup>
import { defineProps, inject } from "vue";

const props = defineProps({
  title: String,
  targetId: String,
  buttonCaption: String,
});

// const buttonAction = inject("buttonAction") as
//   | ((payload: MouseEvent) => void)
//   | undefined;
</script>
