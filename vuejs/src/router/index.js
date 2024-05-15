import { createRouter, createWebHashHistory } from "vue-router";

import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import store from "../store";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Bus",
      requiresAuth: true,
    },
    path: "/bus",
    name: "bus",
    component: () => import("@/views/Bus/Bus.vue"),
  },

  {
    meta: {
      title: "busView",
      requiresAuth: true,
    },
    path: "/bus/create",
    name: "BusCreate",
    component: () => import("@/views/Bus/busView.vue"),
  },

  /*bus view End */

//city start
  {
    meta: {
      title: "City",
      requiresAuth: true,
    },
    path: "/city",
    name: "City",
    component: () => import("@/views/City/City.vue"),
  },

  {
    meta: {
      title: "CityView",
      requiresAuth: true,
    },
    path: "/city/create",
    name: "cityCreate",
    component: () => import("@/views/City/cityView.vue"),
  },

  /*city view End */

  //route start
  {
    meta: {
      title: "Routes",
      requiresAuth: true,
    },
    path: "/routes",
    name: "Routes",
    component: () => import("@/views/Routes/Routes.vue"),
  },

  {
    meta: {
      title: "RoutesView",
      requiresAuth: true,
    },
    path: "/routes/create",
    name: "RoutesCreate",
    component: () => import("@/views/Routes/RoutesView.vue"),
  },

  /*route view End */


  //reservation start
  {
    meta: {
      title: "Reservation",
      requiresAuth: true,
    },
    path: "/reservations",
    name: "Reservation",
    component: () => import("@/views/Reservation/Reservation.vue"),
  },

  {
    meta: {
      title: "ReservationView",
      requiresAuth: true,
    },
    path: "/reservation/create",
    name: "ReservationCreate",
    component: () => import("@/views/Reservation/ReservationView.vue"),
  },

  /*reservation view End */

  //seat start
  {
    meta: {
      title: "Seat",
      requiresAuth: true,
    },
    path: "/seats",
    name: "Seat",
    component: () => import("@/views/Seat/Seat.vue"),
  },

  {
    meta: {
      title: "SeatView",
      requiresAuth: true,
    },
    path: "/seat/create",
    name: "SeatCreate",
    component: () => import("@/views/Seat/SeatView.vue"),
  },
  {
    meta: {
      title: "SeatsView",
      requiresAuth: true,
    },
    path: "/seats/:id",
    name: "SeatsView",
    component: () => import("@/views/Seat/SeatsView.vue"),
  },
  /*seat view End */

  //passenger start
  {
    meta: {
      title: "Seat",
      requiresAuth: true,
    },
    path: "/seats",
    name: "Seat",
    component: () => import("@/views/Seat/Seat.vue"),
  },

  {
    meta: {
      title: "SeatView",
      requiresAuth: true,
    },
    path: "/seat/create",
    name: "SeatCreate",
    component: () => import("@/views/Seat/SeatView.vue"),
  },
  {
    meta: {
      title: "PassengerView",
      requiresAuth: true,
    },
    path: "/passengers/:id",
    name: "PassengerView",
    component: () => import("@/views/PassengerView.vue"),
  },
  /*passanger view End */
  /*ticket view start */

  {
    meta: {
      title: "Ticket",
      requiresAuth: true,
    },
    path: "/bus-ticket/create",
    name: "Ticket",
    component: () => import("@/views/Ticket.vue"),
  },

    /*ticket view End */

  {
    meta: {
      title: "ResetSecret",
    },
    path: "/secretword/ResetSecret",
    name: "reset-secret",
    component: () => import("@/views/secretword/ResetSecret.vue"),
  },
  {
    meta: {
      title: "TokenSecret",
    },
    path: "/secretword/TokenSecret",
    name: "reset-token",
    component: () => import("@/views/secretword/TokenSecret.vue"),
  },


  {
    meta: {
      title: "SuccessMessage",
      requiresAuth: false,
    },
    path: "/success_message",
    name: "SuccessMessage",
    component: () => import("@/views/SuccessMessage.vue"),
  },

  ///
  {
    meta: {
      title: "User",
      requiresAuth: true,
    },
    path: "/users",
    name: "users",
    component: () => import("@/views/User.vue"),
  },
  {
    meta: {
      title: "UserView",
      requiresAuth: true,
    },
    path: "/users/create",
    name: "UserCreate",
    component: () => import("@/views/UserView.vue"),
  },
  {
    meta: {
      title: "UserView",
      requiresAuth: true,
    },
    path: "/users/:id",
    name: "UserView",
    component: () => import("@/views/UserView.vue"),
  },

  ///

  {
    meta: {
      title: "Logos",
      requiresAuth: true,
    },
    path: "/logos",
    name: "logos",
    component: () => import("@/views/Logos.vue"),
  },
  {
    meta: {
      title: "LogoView",
      requiresAuth: true,
    },
    path: "/logos/create",
    name: "LogoCreate",
    component: () => import("@/views/LogoView.vue"),
  },

  {
    meta: {
      title: "LogoView",
      requiresAuth: true,
    },
    path: "/logos/create",
    name: "LogoCreate",
    component: () => import("@/views/LogoView.vue"),
  },

  ///
  {
    meta: {
      title: "LogoView",
      requiresAuth: true,
    },
    path: "/logos/:id",
    name: "LogoView",
    component: () => import("@/views/LogoView.vue"),
  },
  ///
 ///
 {
  meta: {
    title: "test",
    requiresAuth: true,
  },
  path: "/test",
  name: "test",
  component: () => import("@/views/test.vue"),
},
///

  ////

  {
    meta: {
      title: "Profile",
    },
    path: "/profile/:id",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },

  {
    path: "/auth",
    redirect: "/login",
    name: "auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        meta: {
          title: "Login",
        },
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        meta: {
          title: "Register",
        },
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
      },
      {
        meta: {
          title: "Reset",
        },
        path: "/password/reset",
        name: "reset",
        component: () => import("@/views/password/Reset.vue"),
      },
      {
        meta: {
          title: "Token",
        },
        path: "/password/token",
        name: "token",
        component: () => import("@/views/password/Token.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
