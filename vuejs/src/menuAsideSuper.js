import {
  mdiAccountCircle,
  mdiMonitor,
  mdiPalette,
  mdiAccountMultiplePlus,
  mdiCameraImage,
  mdiAccountPlus,
  mdiShapePlus,
  mdiChartBarStacked,
  mdiStoreMarkerOutline,
  mdiArrowCollapseDown,
  mdiArrowExpandUp,
  mdiHistory,
  mdiCartPercent,
  mdiGraph,
  mdiAccountGroup,
  mdiCartArrowDown,
  mdiHome,
  mdiSale,
  mdiBus,
  mdiCityVariantOutline,
  mdiRoutes,
  mdiTicketAccount,
  mdiAirplaneTakeoff,
  mdiSeatReclineExtra
} from "@mdi/js";
import store from "@/store";
import { computed, ref, watch, onMounted } from "vue";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },

  {
    to: "/users",
    label: "Users",
    icon: mdiAccountMultiplePlus,
  },

  {
    to: "/bus",
    label: "Bus  ",
    icon: mdiBus,
  },
  {
    to: "/city",
    label: "City  ",
    icon: mdiCityVariantOutline,
  },
  {
    to: "/routes",
    label: "Route  ",
    icon: mdiRoutes,
  },
  {
    to: "/seats",
    label: "Seats  ",
    icon: mdiSeatReclineExtra ,
  },
  {
    to: "/bus-ticket/create",
    label: "Ticket  ",
    icon: mdiTicketAccount,
  },
  {
    to: "/reservations",
    label: "Reservation  ",
    icon: mdiAirplaneTakeoff,
  },
  {
    label: "Logos",
    icon: mdiCameraImage,
    menu: [
      {
        to: "/logos",
        label: "Logos",
        icon: mdiCameraImage,
      },
      {
        to: "/logos/create",
        label: "Create Logo",
        icon: mdiCameraImage,
      },
    ],
  },

  {
    to: "/",
    label: "Styles",
    icon: mdiPalette,
  },
  {
    to: "/profile/:id",
    label: "Profile",
    icon: mdiAccountCircle,
  },
];
