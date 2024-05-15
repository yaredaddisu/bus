<template>

  <div  v-for="logo in getLogo.data " :key="logo.id">

    <img v-if="logo.image_url" :src="logo.image_url" alt="Logo " class="h-[60px]   w-[60px]   rounded-full">
    <img v-else src="../assets/avator.png" alt="Logo " class="h-[60px]   w-[60px]   rounded-full">

  </div>
</template>

<script setup>
import store from "../store";
import { computed, ref, onMounted } from "vue";
import axiosClient from "../axios.js";


const getLogo = ref(0);




const loading = ref({
  getLogo: true,
 


});
function updateDashboard(){
   loading.value = {
    getLogo: true,
 

  }
  };
    axiosClient.get(`/get-logo`, {}).then(({data: logo}) => {
    getLogo.value = logo;
    loading.value.getLogo = false;
  })
   
  store.dispatch("getUser");

onMounted(() => {
   updateDashboard();
});

 
</script>

<style>

</style>