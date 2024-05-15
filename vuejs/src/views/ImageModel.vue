<script setup>
import { reactive ,watch ,ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiPhoneClassic,
  mdiLockOutline
} from "@mdi/js";
import Alert from "../components/Alert.vue";

import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useStore } from "vuex";
import OverlayLayer from "@/components/OverlayLayer.vue";

import { computed } from "vue";

import { useRoute, useRouter } from "vue-router";
import store from '../store'


const route = useRoute();
const router = useRouter();

const userData = computed(() => store.state.user.data);
const load = computed(() => store.state.user.loading);

 
const showModal = ref(false);

watch(
  () => store.state.user.data,
  (newVal, oldVal) => {
    userData.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      
    };
  }
);


if (route.params.id) {
  store.dispatch("getUser", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    userData.value.image = reader.result;

    // The field to display here
    userData.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}
 
const errors = ref({});
const loading = ref(false);

function updateProfile(){
   if (userData.value.id) {
    loading.value = true;

    store.dispatch('updateProfile', userData.value)
      .then(response => {
    loading.value = false;
    showModal.value = false;
    userData.password.value = null;

        if (response.data === 200) {
          // TODO show notification
          store.dispatch('getUser')
         }

         store.dispatch('getUser')

      }).catch(({response}) => {
        loading.value = false;


    if (response.status === 422) {
      errors.value = response.data.errors;

    }else if (response.status === 423) {
       store.commit("notify", {
 type: "error",
 message: response.data.error,
});

    }

    showModal.value = false;
  userData.UserSecret.value = null;
  })
  }

 }
 store.dispatch('getUser')


function toggleModal(){
    showModal.value = !showModal.value;
    }

    function open(){
    const route = router.resolve({
  name:"reset-secret",
 
 });
 window.open(route.href);
}
 

</script>

<template>

          <CardBox is-form @submit.prevent="updateProfile">
         <OverlayLayer v-if="load" />

          <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">



            <div class="relative w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button @click="toggleModal()" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Enter Your Secret Word</h3>
                        <div class="space-y-6" >
                           
                            <div>
                                 <input   type="text" v-model="userData.UserSecret" name="password"
                                 id="password" placeholder="Enter Your Secret Word" class="bg-gray-50
                                  border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-full
                                    p-2.5 dark:bg-gray-600 dark:border-gray-500 
                                    dark:placeholder-gray-400 dark:text-white" required>
                            </div>
                        
                             <button     type="submit" class="w-full mt-10 flex 
                             justify-center py-2 px-3 border border-transparent rounded-md text-white 
                             font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 
                             focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                         
                             :class="{'cursor-not-allowed': load,'hover:bg-gray-700': load,}"
                             >
                             <svg
                            
                                    v-if="load"
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
                           Continue
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        </div> 

 
            <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
                <div v-for="(field, i) of Object.keys(errors)" :key="i">
                  <div v-for="(error, ind) of errors[field] || []" :key="ind">
                    * {{ error }}
                  </div>
                </div>
              </Alert>

            
           <FormField label="Image" help="Upload Here">
                <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="userData.image_url"
                :src="userData.image_url"
                :alt="userData.title"
                class="w-64 h-48 object-cover rounded:md"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  type="file"
                  @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!--/ Image -->     
            </FormField>

          <FormField label="Name" help="Required. Your name">
            <FormControl
              v-model="userData.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="userData.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>
          <FormField label="Phone number" help="Required. Your Phone number">
            <FormControl
              v-model="userData.phone"
              :icon="mdiPhoneClassic"
              type="phone"
              name="phone"
              required
              autocomplete="phone"
            />
          </FormField>
          <FormField label="Company name" help="Required. Your Company name">
            <FormControl
              v-model="userData.company"
               type="text"
              name="company"
              required
              autocomplete="company"
            />
          </FormField>
        
          <FormField label="Address" help="Required. Your Address">
            <FormControl
              v-model="userData.address"
               type="text"
              name="address"
              required
              autocomplete="address"
            />
          </FormField>
          <div class="grid grid-cols-2 gap-2">
            <FormField label="Company TIN" help="Required. Your Company TIN Reg.No">
              <FormControl
                v-model="userData.Tin"
                 type="text"
                name="tin"
                 autocomplete="tin"
              />
            </FormField>
            <FormField label="Company VAT" help="Required. Your Company VAT Reg.No">
              <FormControl
                v-model="userData.Vat"
                 type="text"
                name="vat"
                 
                autocomplete="vat"
              />
            </FormField>
           </div>
          <FormField label="Secret Word" help="Required. Your default  Secret Word is '1234' change this word">
            <FormControl
              v-model="userData.secret"
              :icon="mdiLockOutline"
              type="text"
              name="secret"
               autocomplete="secret"
            />
          </FormField>
          <p class="text-center">
            <button  @click="open()" class="text-sm underline  hover:text-gray-900">Forgot Secret Word?</button>
          </p>
          <template #footer>
            <BaseButtons  >
               
<button @click="toggleModal()" :disabled="loading" type="button" class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"

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
    Update Profile
</button>

 
              </BaseButtons>
          </template>
        </CardBox>
  
</template>
