<template>
  <div class="col-md-9">
    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title">Caixa de Entrada</h3>

        <div class="card-tools">
          <div class="input-group input-group-sm">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar mensagem"
            />
            <div class="input-group-append">
              <div class="btn btn-primary">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-tools -->
      </div>
      <!-- /.card-header -->
      <div class="card-body p-0">
        <div class="mailbox-controls">
          <!-- Check all button -->
          <button type="button" class="btn btn-default btn-sm checkbox-toggle">
            <i class="far fa-square"></i>
          </button>
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm">
              <i class="far fa-trash-alt"></i>
            </button>
            <button type="button" class="btn btn-default btn-sm">
              <i class="fas fa-reply"></i>
            </button>
          </div>
          <!-- /.btn-group -->
          <button type="button" class="btn btn-default btn-sm">
            <i class="fas fa-sync-alt"></i>
          </button>
          <div class="float-right">
            1-50/200
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <!-- /.btn-group -->
          </div>
          <!-- /.float-right -->
        </div>
        <div class="table-responsive mailbox-messages">
          <table
            v-if="messages.length > 0"
            class="table table-hover table-striped"
          >
            <tbody>
              <tr
                :key="message.id"
                v-for="message in messages"
                @click="readMessage(message.id)"
              >
                <td>
                  <div class="icheck-primary">
                    <input type="checkbox" value="" id="check2" />
                    <label for="check2"></label>
                  </div>
                </td>
                <td class="mailbox-star">
                  <a href="#"><i class="fas fa-star-o text-warning"></i></a>
                </td>
                <td class="mailbox-name">
                  <RouterLink
                    :to="{
                      name: 'readMail',
                      params: { messageId: message.id },
                    }"
                    >{{ message.remetente }}</RouterLink
                  >
                </td>
                <td class="mailbox-subject">
                  <b>{{ message.assunto }}</b>
                </td>
                <td class="mailbox-attachment">
                  <!-- <i class="fas fa-paperclip"></i> -->
                </td>
                <td class="mailbox-date">
                  {{ moment(message.created_at, moment.ISO_8601).fromNow() }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- /.table -->
          <div v-else>
            <p class="text-center text-muted">
              Não há mensagens para ser exibidas.
            </p>
          </div>
        </div>
        <!-- /.mail-box-messages -->
      </div>
      <!-- /.card-body -->
      <div class="card-footer p-0">
        <div class="mailbox-controls">
          <!-- Check all button -->
          <button type="button" class="btn btn-default btn-sm checkbox-toggle">
            <i class="far fa-square"></i>
          </button>
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm">
              <i class="far fa-trash-alt"></i>
            </button>
            <button type="button" class="btn btn-default btn-sm">
              <i class="fas fa-reply"></i>
            </button>
          </div>
          <!-- /.btn-group -->
          <button type="button" class="btn btn-default btn-sm">
            <i class="fas fa-sync-alt"></i>
          </button>
          <div class="float-right">
            1-50/200
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <!-- /.btn-group -->
          </div>
          <!-- /.float-right -->
        </div>
      </div>
    </div>
    <!-- /.card -->
  </div>
  <!-- /.col -->
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment/dist/moment";
import localization from "moment/dist/locale/pt-br";
//import type Message from "@/models/Message";
import { useMessageStore } from "@/stores/messages";
import { storeToRefs } from "pinia";
const messageStore = useMessageStore();
interface Props {
  messageStatus: string;
}

const props = defineProps<Props>();

const { filteredMessages: messages } = storeToRefs(messageStore);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  //
  moment.locale("pt-br");
  moment.updateLocale("pt-br", localization);
  await messageStore.loadNewMessages(props.messageStatus);
});

watch(route, async (newRoute: any) => {
  console.log("NEW ROUTE PARAMS: ", newRoute);
  await messageStore.loadNewMessages(newRoute.params.messageStatus);
});

function readMessage(messageId: number) {
  router.push(`/read-mail/${messageId}`);
}
</script>
