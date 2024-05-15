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
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
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
