<template>
  <div class="col-md-9">
    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title">Responder Mensagem</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="pb-4">
          <div>
            <b>Responder para:</b> <span>{{ selectedMessage.remetente }}</span>
          </div>
          <div>
            <b>Assunto:</b> <span>{{ selectedMessage.assunto }}</span>
          </div>
          <div>
            <p class="card-text">
              {{ selectedMessage.mensagem }}
            </p>
          </div>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            :value="formValues?.destinatario"
            disabled
          />
          <!-- <input type="hidden" v-model="formValues.remetente" /> -->
        </div>
        <div class="form-group">
          <input class="form-control" :value="formValues.assunto" disabled />
          <!-- <input type="hidden" v-model="formValues.assunto" /> -->
        </div>
        <div class="form-group">
          <textarea
            id="compose-textarea"
            class="form-control"
            style="height: 300px"
            v-model="formValues.mensagem"
          ></textarea>
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <div class="float-right">
          <button @click="submitForm" type="submit" class="btn btn-primary">
            <i class="far fa-envelope"></i> Enviar
          </button>
        </div>
        <RouterLink to="/inbox/UNREAD" class="btn btn-default">
          <i class="fas fa-times"></i> Cancelar
        </RouterLink>
      </div>
      <!-- /.card-footer -->
    </div>
    <!-- /.card -->
  </div>
  <!-- /.col -->
</template>
<script lang="ts" setup>
import { useMessageStore } from "@/stores/messages";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { TYPE, useToast } from "vue-toastification";
import type Message from "@/models/Message";

const messageStore = useMessageStore();

const { selectedMessage } = storeToRefs(messageStore);

const toast = useToast();

const props = defineProps({
  messageId: String,
});

onMounted(() => {
  console.log("Reply to: ", props.messageId);
});

const formValues = ref({
  remetente: "suporte@portalcrtelecom.com.br",
  destinatario: selectedMessage.value.remetente,
  assunto: selectedMessage.value.assunto,
  mensagem: "",
});

async function submitForm() {
  try {
    console.log("Form values: ", formValues.value);
    await messageStore.sendMessage({ ...(formValues.value as Message) });
    toast("A mensagem foi enviada com sucesso!", {
      type: TYPE.SUCCESS, // or "success", "error", "default", "info" and "warning"
    });
  } catch (error: any) {
    console.log("Error sending message: ", error);
    toast("Não foi possível enviar a mensagem.", {
      type: TYPE.ERROR, // or "success", "error", "default", "info" and "warning"
    });
  }
}
</script>
