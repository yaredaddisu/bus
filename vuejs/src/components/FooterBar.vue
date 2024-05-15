<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
import JustboilLogo from "@/components/JustboilLogo.vue";
import { computed, ref, onMounted } from "vue";
import axiosClient from "../axios.js";

import store from "../store";
import Animated from "@/components/Animated.vue";

const data = computed(() => store.state.user.data);

const year = new Date().getFullYear();

const social = ref(0);

const loading = ref({
  social: true,
});

function updateDashboard() {
  loading.value = {
    social: true,
  };
}

onMounted(() => {
  updateDashboard();
});
</script>

<template>
  <footer class="py-2 px-6 footer" :class="containerMaxW">
    <BaseLevel>
      <div class="md:py-2 ml-20 justify-center sm:hidden ssm:hidden msm:hidden">
        <div class="text-center md:text-left">
          <b>Lomi Website &copy;Copyright {{ year }}, </b>

          <Animated class="ml-4" />

          <slot />
        </div>
      </div>
    </BaseLevel>
  </footer>
</template>

<style>
@media print {
  footer {
    display: none;
  }
}
</style>
