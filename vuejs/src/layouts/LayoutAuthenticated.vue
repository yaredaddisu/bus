<script setup>
import { mdiForwardburger, mdiBackburger, mdiCreditCardOutline, mdiMenu } from "@mdi/js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import Notification from "@/components/Notification.vue";
import router from "@/router";
import JustboilLogo from "@/components/JustboilLogo.vue";
//import store from "@/store";
import menuAsideSuper from "@/menuAsideSuper.js";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "vuex";
import OverlayButton from "@/components/OverlayButton.vue";

const store = useStore();

const data = computed(() => store.state.user.data);

const layoutAsidePadding = "xl:pl-0";

const styleStore = useStyleStore();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    store.dispatch("logout").then(() => {
      router.push({
        name: "login",
      });
    });
  }
};

const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

//const dateForUi = new Date(data.created_at).toLocaleString('nl-NL');

function pricing(data) {
  const route = router.resolve({
    name: "lomi-price",
    params: { id: data.id },
  });
  window.open(route.href);
}
</script>

<template>
  <Notification />
  <OverlayButton />

  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:flex"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>

        <div class="ml-6 mt-2 h-12 layout">
          <JustboilLogo />
        </div>
      </NavBar>
      <AsideMenu
        v-if="data.is_admin == 1"
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAsideSuper"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <AsideMenu
        v-else-if="data.is_admin == 0"
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />

      <div>
        <slot />
      </div>
      <FooterBar> </FooterBar>
    </div>
  </div>
</template>

<style></style>
