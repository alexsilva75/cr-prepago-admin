import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardViewVue from "@/views/DashboardView.vue";
import DashboardHomeView from "@/views/DashboardHomeView.vue";
import CustomersView from "@/views/CustomersView.vue";
import TransactionsListViewVue from "@/views/TransactionsListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardViewVue,
      redirect: "./home",
      children: [
        {
          path: "/home",
          name: "dashboard-home",
          component: DashboardHomeView,
        },
        {
          path: "/customers",
          name: "customers",
          component: CustomersView,
        },
        {
          path: "/transactions",
          name: "transactions",
          component: TransactionsListViewVue,
        },
      ],
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
