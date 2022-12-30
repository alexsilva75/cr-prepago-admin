import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardViewVue from "@/views/DashboardView.vue";
import DashboardHomeView from "@/views/DashboardHomeView.vue";
import CustomersView from "@/views/customers/CustomersView.vue";
import ActiveTransactionsView from "@/views/transactions/ActiveTransactionsView.vue";
import TransactionSearchViewVue from "@/views/transactions/TransactionSearchView.vue";
import MailBoxViewVue from "@/views/mailbox/MailBoxView.vue";
import CustomerDetailViewVue from "@/views/customers/CustomerDetailView.vue";
import TransactionDetailViewVue from "@/views/transactions/TransactionDetailView.vue";
import QuotaProductListViewVue from "@/views/quota-products/QuotaProductListView.vue";
import NewQuotaViewVue from "@/views/quota-products/NewQuotaView.vue";
import MailBoxListViewVue from "@/views/mailbox/MailBoxListView.vue";
import ComposeViewVue from "@/views/mailbox/ComposeView.vue";
import ReadMailViewVue from "@/views/mailbox/ReadMailView.vue";
import ComposeReplyViewVue from "@/views/mailbox/ComposeReplyView.vue";
import DailyQuotaViewVue from "@/views/quota/DailyQuotaView.vue";
import ActiveSessions from "@/views/sessions/ActiveSessions.vue";

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
      redirect: "/home",
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
          path: "/customer/detail/:customerId",
          name: "customerDetail",
          component: CustomerDetailViewVue,
          props: true,
        },
        {
          path: "/transactions",
          name: "transactions",
          component: ActiveTransactionsView,
          props: true,
        },
        {
          path: "/transactions/search/:paymentStatus",
          name: "transactionsSearch",
          component: TransactionSearchViewVue,
          props: true,
        },
        {
          path: "/transactions/:transactionId/detail",
          name: "transactionDetail",
          component: TransactionDetailViewVue,
          props: true,
        },
        {
          path: "/quota",
          name: "quota",
          component: DailyQuotaViewVue,
        },
        {
          path: "/quota-products",
          name: "quota-products",
          component: QuotaProductListViewVue,
        },
        {
          path: "/quota-products/new",
          name: "newQuotaProduct",
          component: NewQuotaViewVue,
        },
        {
          path: "/mailbox",
          name: "mailbox",
          redirect: "/inbox",
          component: MailBoxViewVue,
          children: [
            {
              path: "/inbox/:messageStatus",
              name: "inbox",
              component: MailBoxListViewVue,
              props: true,
            },
            {
              path: "/compose",
              name: "compose",
              component: ComposeViewVue,
            },
            {
              path: "/compose-reply/:messageId",
              name: "composeReply",
              component: ComposeReplyViewVue,
              props: true,
            },
            {
              path: "/read-mail/:messageId",
              name: "readMail",
              component: ReadMailViewVue,
              props: true,
            },
          ],
        },
        {
          path: "/connected-users",
          component: ActiveSessions,
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
