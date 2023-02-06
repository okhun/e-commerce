import { storeToRefs } from "pinia";
import {
  type Router,
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";
import { useAuthStore } from "@/store/auth";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("@/views/products.vue"),
  },
  {
    path: "/auth/login",
    name: "login",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/auth/register",
    name: "register",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/register.vue"),
  },
  {
    path: "/products/show/:id",
    name: "product_show",
    meta: {
      layout: "default",
    },
    component: () => import("@/views/show.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/error.vue"),
  },
];

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to, _, next) => {
  const store = useAuthStore();
  const { isAuthenticated } = storeToRefs(store);
  const publicPages = ["/auth/login", "/auth/register"];

  const isGuest = publicPages.includes(to.path);

  if (isAuthenticated.value && isGuest) {
    next({ name: "home" });
  } else {
    next();
  }
});
