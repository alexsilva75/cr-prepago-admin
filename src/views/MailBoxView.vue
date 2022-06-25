<template>
  <div class="row">
    <div class="col-md-3">
      <a href="compose.html" class="btn btn-primary btn-block mb-3">Compose</a>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Folders</h3>

          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <i class="fas fa-inbox"></i> Inbox
                <span class="badge bg-primary float-right">12</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-envelope"></i> Sent
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-file-alt"></i> Drafts
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-filter"></i> Junk
                <span class="badge bg-warning float-right">65</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-trash-alt"></i> Trash
              </a>
            </li>
          </ul>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Labels</h3>

          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle text-danger"></i>
                Important
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle text-warning"></i> Promotions
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle text-primary"></i>
                Social
              </a>
            </li>
          </ul>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
    <div class="col-md-9">
      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">Inbox</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm">
              <input
                type="text"
                class="form-control"
                placeholder="Search Mail"
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
            <button
              type="button"
              class="btn btn-default btn-sm checkbox-toggle"
            >
              <i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="far fa-trash-alt"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-reply"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-share"></i>
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
            <table class="table table-hover table-striped">
              <tbody>
                <tr :key="message.id" v-for="message in newMessages">
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
                    <a href="read-mail.html">{{ message.remetente }}</a>
                  </td>
                  <td class="mailbox-subject">
                    <b>{{ message.assunto }}</b>
                  </td>
                  <td class="mailbox-attachment">
                    <i class="fas fa-paperclip"></i>
                  </td>
                  <td class="mailbox-date">
                    {{
                      moment(
                        message.created_at,
                        moment.ISO_8601,
                        "pt-br"
                      ).fromNow()
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- /.table -->
          </div>
          <!-- /.mail-box-messages -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer p-0">
          <div class="mailbox-controls">
            <!-- Check all button -->
            <button
              type="button"
              class="btn btn-default btn-sm checkbox-toggle"
            >
              <i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="far fa-trash-alt"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-reply"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-share"></i>
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
  </div>
  <!-- /.row -->
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import moment from "moment/dist/moment";
import localization from "moment/dist/locale/pt-br";

import { useMessageStore } from "@/stores/messages";

const messageStore = useMessageStore();

const { newMessages } = storeToRefs(messageStore);

onMounted(async () => {
  await messageStore.loadNewMessages();
  moment.locale("pt-br");
  moment.updateLocale("pt-br", localization);

  console.log("Moment Locale: ", moment.locale());
  console.log(
    "De agora: ",
    moment("2022-06-23T19:31:17.000000Z", moment.ISO_8601, "pt-br").fromNow()
  );
});
</script>
