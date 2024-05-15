<script setup>
import { computed, ref } from "vue";

import store from "@/store";

defineProps({
  checkable: Boolean,
});

 const user = computed(()=>store.state.user.data);

</script>

<template>
 
</template>
