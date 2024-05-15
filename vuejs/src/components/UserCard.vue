<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import PillTag from "@/components/PillTag.vue";
import { useStore } from "vuex";
 import { useRouter } from "vue-router";



const store = useStore();
    const router = useRouter();
store.dispatch("getUser");
 
const userData = computed(() => store.state.user.data);

const userSwitchVal = ref(false);

defineProps({
  image: Object,
 });
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <img v-if="userData.image_url" :src="userData.image_url" :alt="userData.name" class="rounded-full h-[300px] w-[300px]">
      <img v-else src="../assets/avator.png" :alt="userData.name" class="rounded-full h-[300px] w-[300px]">

      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Notifications"
            :input-value="true"
          />
        </div>
        <h1 class="text-2xl">
          Hello, <b>{{ userData.name }}</b
          >!
        </h1>
 

      <p><b>{{ userData.email }}</b></p>
        <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
