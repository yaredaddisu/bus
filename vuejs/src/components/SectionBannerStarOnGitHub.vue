<script setup>
import { mdiGithub } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import SectionBanner from "@/components/SectionBanner.vue";
import { cyanToBlue } from "@/colors";

import store  from "../store";
import { reactive, computed, ref ,watch} from "vue";
const data = computed(()=>store.state.user.data);
store.dispatch("getUser");

</script>

<template>
   <SectionBanner :class="cyanToBlue">
    <h1 class="text-3xl text-white mb-6">
      Welcome Back  <b>{{ data.name   }}</b> ;-)
    </h1>
    
  </SectionBanner>
</template>
