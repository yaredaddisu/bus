 
<template>
    <main class="loginbackground mt-10 relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-sm">
    <img src="@/assets/lomi.jpg" alt="">
  
    <p class="mb-10 text-center text-sm">Check your email copy and paste the token below.</p>
     
  <div class="w-full max-w-sm"  >
    <form action="" v-on:submit.prevent="validateToken" class="w-full"><div class="">
      <label for="email-address" class="block text-sm font-semibold leading-6 text-gray-900 mt-6">Token</label>
      <input type="token"
       id="token-address"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required="" 
          placeholder="Enter Token"
          v-bind:class="{'is_invalid':errorToken, 'is_valid': infoToken}"
        v-model="token">
  
        <div class="text-red-500">{{ errorToken }}</div>
        <div class="text-green-500">{{ infoToken }}</div>
  
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
     Validate Token
</button>
      
  </form>
  </div>
  <div  v-if="tokenValid">

    <form action="" v-on:submit.prevent="changePassword" class="w-full"><div class="">
      <div v-for="(errorArray, idx) in notifmsg" :key="idx">
        <div v-for="(allErrors, idx) in errorArray" :key="idx" class="flex-col items-stretch text-sm">
            <span class="text-red-500 ">{{ allErrors}} </span>
        </div>
    </div>
      <label for="email-address" class="block text-sm font-semibold leading-6 text-gray-900 mt-6">New  Password</label>
      <input type="password"
       id="password"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required="" 
          placeholder="Enter password"
         v-model="newPassword">
  
         <label for="email-address" class="block text-sm font-semibold leading-6 text-gray-900 mt-6">Confirm Password</label>
         <input type="password"
          id="password"
           class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" required="" 
             placeholder="Enter password"
            v-model="password_confirmation">
     
           
  
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
   Change Password
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
  
  </div>
  
  </main>
  
  <footer class="relative z-10 flex-none text-sm text-center py-4 px-4 sm:px-6 lg:px-8">
  
  </footer>
  
  
  
  
  
  </template>
  
  <script>
  
  import axiosClient from "@/axios.js";
    import Alert from "@/components/Alert.vue";

   export default{
    name:'password-reset',
    props:['app'],
    data(){
      return {
        token: "",
        errorToken:null,
        newPassword:"",
        password_confirmation:"",
        errorNewPassword:null,
        errorpassword_confirmation:null,
        tokenValid:false,
        loading:false,
        notifmsg: ''
      };
  
    },
  methods:{
    
  
  
    validateToken(){
    this.errorToken = null;
  
    if(!this.token){
      this.errorToken = 'Token is required';
    };
  if(!this.errorToken){
    const data = {
        token: this.token
      }
      this.loading = true;
     axiosClient.post('/validate-token', data)
              .then(response => {
                this.loading = false;
             if(response.data.id){
              this.tokenValid = true;
              this.infoToken = "Token Valid";
              this.user = response.data
              //console.log(response.data.id)
              this.id = response.data.id
                console.log(this.id)
  
             }
  
                 return response.data
              }).catch(error=>{
                this.loading = false;
        this.errorToken = error.response.data.error;
      }) 
  }
     
    },
  
    changePassword(){
  
      this.errorNewPassword = null;
      this.errorpassword_confirmation = null;
   
  
         const data = {
          password: this.newPassword,
          password_confirmation: this.password_confirmation,

          user_id: this.id
         }
         this.loading = true;

        axiosClient.post('/reset-password', data)
              .then(response => {
                this.loading = false;

                this.$router.push("/login");
  
                 return response.data
  
              }).catch(e => {
                  this.loading = false;
       this.notifmsg = e.response.data
       }) 
       
            }
    },
   
  
   };
  </script>
  
  <style>
  
  </style>