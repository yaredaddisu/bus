<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  
});

 

const username = computed(() => props.username);

</script>

<template>
  <div>
 
    <img
      :src="avatar"
      :alt="username"
      class="rounded-full block h-auto w-[40px]   mr-2 max-w-full bg-gray-100 dark:bg-slate-800"
    />
    
    <slot />
   
  </div>
  <p>
     
    {{ username }}
   </p>
</template>
