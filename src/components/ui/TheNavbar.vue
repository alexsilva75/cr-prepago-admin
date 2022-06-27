<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>

      <!-- <li class="nav-item d-none d-sm-inline-block">
        <RouterLink class="nav-link" to="/dashboard">Início</RouterLink>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <RouterLink class="nav-link" to="/about">Como funciona</RouterLink>
      </li>
      <li v-if="!isLoggedIn" class="nav-item d-none d-sm-inline-block">
        <RouterLink class="nav-link" to="/login">Entrar</RouterLink>
      </li> -->
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <!-- <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input
                class="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button
                  class="btn btn-navbar"
                  type="button"
                  data-widget="navbar-search"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li> -->

      <!-- Messages Dropdown Menu -->

      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-danger navbar-badge">
            {{ newMessagesCount }}
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">
            {{ newMessagesCount }}

            Notificações</span
          >
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i>
            {{ newMessagesCount }}
            nova(s) mensagem(ns)
            <!-- <span class="float-right text-muted text-sm">3 mins</span> -->
          </a>
          <!-- <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a> -->
          <div class="dropdown-divider"></div>
          <RouterLink to="/mailbox" class="dropdown-item dropdown-footer"
            >Ver Mensagens</RouterLink
          >
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <!-- <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-controlsidebar-slide="true"
          href="#"
          role="button"
        >
          <i class="fas fa-th-large"></i>
        </a>
      </li> -->
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useMessageStore } from "@/stores/messages";
import { storeToRefs } from "pinia";

const messageStore = useMessageStore();

const store = useAuthStore();

const { isLoggedIn } = storeToRefs(store);

const { newMessagesCount } = storeToRefs(messageStore);
</script>

<style scoped>
.fa-comments:before {
  content: "\f086";
}
</style>
