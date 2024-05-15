<script setup>
import UserAvatar from "@/components/UserAvatar.vue";
import store  from "../store";
import { reactive, computed, ref ,watch} from "vue";
import { mdiAccountBoxMultiple } from '@mdi/js';
const data = computed(()=>store.state.user.data);

 </script>

 

<template>
   <UserAvatar :username="data.name" :avatar="data.image_url">
    <slot />
  </UserAvatar>
   
 
</template>
