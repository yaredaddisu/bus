 
<template>
  <main class="loginbackground mt-10 relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8">
<div class="w-full max-w-sm">
  <img src="@/assets/lomi.jpg" alt="">

  <p class="mb-10 text-center text-sm">Enter your email and we'll send you a link to reset your password.</p>
  <form action="" v-on:submit.prevent="sendToken" class="w-full">
    <div class="">
    <label for="email-address" class="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
    <input type="email"
     id="email-address"
      class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required="" 
        placeholder="Enter Email  "
      v-model="email">
      <div class="text-red-500">{{ errorEmail }}</div>
   </div>
   <button :disabled="loading" type="submit" class="w-full mt-4 flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"

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
Get Token
</button>
 


  <p class="mt-6">Don't have an account?</p>
 <router-link :to="{ name: 'register' }" class="rounded-md mt-6  border border-gray-300 hover:border-gray-400 py-2 px-10 font-medium flex items-center justify-center">
  Get access
  <svg aria-hidden="true" width="11" height="10" fill="none" class=" flex-none ml-1.5">
    <path d="M5.977 9.639L10.616 5 5.977.362l-.895.89L8.19 4.353H.384v1.292H8.19L5.082 8.754l.895.885z" fill="currentColor" />
  </svg>
</router-link>
</form>

 
 
</div>

</main>

<footer class="relative z-10 flex-none text-sm text-center py-4 px-4 sm:px-6 lg:px-8">
 


</footer>





</template>

<script>

import axiosClient from "@/axios.js";

 export default{
  name:'password-reset',
  props:['app'],
  data(){
    return {
      email: "",
      errorEmail:null,
      token: "",
      errorToken:null,
      newPassword:"",
      passwordAgain:"",
      errorNewPassword:null,
      errorPasswordAgain:null,
      tokenValid:false,
      validEmail:false,
      loading:false,
    };

  },
methods:{
  
  sendToken(){

    const data = {
    email: this.email
  };
  this.loading = true;
  axiosClient.post('/send-token', data)
            .then(response => {
              this.loading = false;

              this.$router.push("/password/token");

               return response.data
            }).catch(error => {
              this.loading = false;
    console.log(error.response.data.error)
    this.errorEmail = error.response.data.error;
  })
 
  },

   
  },
 

 };
</script>

<style>

</style>