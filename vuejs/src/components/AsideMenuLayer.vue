<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed, ref } from "vue";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/AsideMenuList.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import store from "../store";

import axiosClient from "../axios.js";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);

const styleStore = useStyleStore();

const logoutItem = computed(() => ({
  label: "Logout",
  icon: mdiLogout,
  color: "info",
  isLogout: true,
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event) => {
  emit("aside-lg-close-click", event);
};

const getLogo = ref(0);

const loading = ref({
  getLogo: true,
});
function updateDashboard() {
  loading.value = {
    getLogo: true,
  };
}
axiosClient.get(`/get-logo`, {}).then(({ data: logo }) => {
  getLogo.value = logo;
  loading.value.getLogo = false;
});
</script>

<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div
      :class="styleStore.asideStyle"
      class="lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900"
    >
      <BaseLevel type="justify-around lg:justify-center lg:justify-center">
        <div v-for="logo in getLogo.data" :key="logo.id">
          <img :src="logo.image_url" alt="Logo" class="h-[150px] w-[300px]" />
        </div>
      </BaseLevel>

      <div
        :class="styleStore.asideBrandStyle"
        class="flex flex-row h-14 items-center justify-between dark:bg-slate-900"
      >
        <div class="text-center flex-1 lg:text-left lg:pl-6 xxl:text-center xxl:pl-0">
          <div></div>
        </div>
        <button
          class="hidden lg:inline-block xl:inline-block p-3"
          @click.prevent="asideLgCloseClick"
        >
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        :class="
          styleStore.darkMode
            ? 'aside-scrollbars-[slate]'
            : styleStore.asideScrollbarsStyle
        "
        class="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
