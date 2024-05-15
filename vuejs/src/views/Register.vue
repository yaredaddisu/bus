 
<template>
  <div class="w-full float-right">  
    <Navgationbar />
  </div>
  <main class="relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8">
<div class="w-full max-w-sm">
<Logo />
 <h1 class="sr-only">Register Lomi  account</h1>

<form @submit="register" >
<Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
   <div v-for="(field, i) of Object.keys(errors)" :key="i">
     <div v-for="(error, ind) of errors[field] || []" :key="ind">
       * {{ error }}
     </div>
   </div>
 </Alert>

<input type="hidden" name=" " value=" "> 
<input type="hidden" name="remember" value="true" />

 <div class="relative mt-5">
 <label for="full-name" class="sr-only">Full name</label>

 <input x-ref="fullname" id="full-name" name="name" type="text"      v-model="user.name"  class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-teal-500 focus:ring-teal-500 focus:outline-none" placeholder="Full name"    />

</div>
<div class="relative ">
 <label for="email-address" class="sr-only">Email address</label>
 <input x-ref="email" id="email-address" name="email" type="email"    v-model="user.email"  class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-teal-500 focus:ring-teal-500 focus:outline-none" placeholder="Email address"    />
</div>
<div class="relative ">
  <label for="phone-number" class="sr-only">Phone number</label>
  <input  id="phone-number" name="phone" type="number"    v-model="user.phone" 
   class="text-gray-900 ring-gray-900 ring-opacity-5
    placeholder-gray-400 appearance-none
     bg-white rounded-md block w-full px-3 
     py-2 border border-transparent shadow 
     ring-1 sm:text-sm mb-4 focus:border-teal-500
      focus:ring-teal-500 focus:outline-none" 
      placeholder="Phone number"/>
 </div>
 <FormField    class="mt-5 ">
  <FormControl 
   id="organization"
  name="organization"
  v-model="user.organization"
  :value="selected"
  :options="selectOptions"

   />
 
</FormField>
<div class="relative">
 <label for="password" class="sr-only">Password</label>
 <input x-ref="password" id="password" name="password" type="password"    v-model="user.password"  class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-6 focus:border-teal-500 focus:ring-teal-500 focus:outline-none" placeholder="Password"    />
   </div>
    <div class="relative">
 <label for="password_confirmation" class="sr-only">Password Confirmation</label>
 <input x-ref="password_confirmation" id="password_confirmation" name="password_confirmation" type="password"    v-model="user.password_confirmation"  class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-6 focus:border-teal-500 focus:ring-teal-500 focus:outline-none" placeholder="Password Confirmation"    />
   </div>
 
<button :disabled="loading" type="submit" class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"

 :class="{'cursor-not-allowed': loading,'hover:bg-gray-700': loading,}"
 >
 <svg

        v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white "
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
     
      >
       <circle
         class="opacity-25"
         cx="12"
         cy="12"
         r="10"
         stroke="currentColor"
         stroke-width="4"
       ></circle>
       <path
         class="opacity-75"
         fill="currentColor"
         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
       ></path>
     </svg>
 Sign up
</button>
<p class="text-bold">Login in to your account</p>
 <router-link :to="{ name: 'login' }" class="rounded-md border mt-3 border-gray-300 hover:border-gray-400 py-2 px-10 font-medium flex items-center justify-center">
   Get access
   <svg aria-hidden="true" width="11" height="10" fill="none" class="flex-none ml-1.5">
     <path d="M5.977 9.639L10.616 5 5.977.362l-.895.89L8.19 4.353H.384v1.292H8.19L5.082 8.754l.895.885z" fill="currentColor" />
   </svg>
</router-link>
</form>
</div>
</main>

<footer class="relative z-10 flex-none text-sm text-center py-2 px-4 sm:px-6 lg:px-8">
 
<FooterBar />
</footer>



</template>

<script setup>
import { ref } from "vue";
 import store from "../store";
import { useRouter } from "vue-router";
import Alert from "../components/Alert.vue";
import FooterBar from "@/components/FooterBar.vue";
 import Logo from "@/components/Logo.vue";
import FormControl from "@/components/FormControl.vue";
 import FormField from "@/components/FormField.vue";
 import Navgationbar from "@/components/Navgationbar.vue";

const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

const router = useRouter();
const user = {
name: "",
email: "",
password: "",
phone: " ",
organization: "",
day_left: date,
};
const loading = ref(false);
const errors = ref({});

function register(ev) {
ev.preventDefault();
loading.value = true;
store
 .dispatch("register", user)
 .then(() => {
   loading.value = false;
   router.push({
     name: "dashboard",
   });
 })
 .catch((error) => {
   loading.value = false;
   if (error.response.status === 422) {
     errors.value = error.response.data.errors;
   }
 });
}

const selectOptions = [
   "Shop" ,
   "Super Market",
   "Hotel and Cafe" ,
   "GYM House" ,
   "Big Organization"
]; 
</script>
<style>

</style>