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
import Alert from "./Alert.vue";

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

 const props = defineProps({
  model: Object,
  index: Number,
});

const showModal = ref(false);

const model = ref({
  company:"",
  address:"",
  Tin:"",
  Vat:""
})

 
 

</script>

<template>

         <CardBox is-form >
         <OverlayLayer v-if="load" />
 
        <pre>{{ userData }}</pre>

            
         
          <FormField label="Company name" help="Required. Your Company name">
            <FormControl
              v-model="model.company"
               type="text"
              name="company"
              required
              autocomplete="company"
            />
          </FormField>
        
          <FormField label="Address" help="Required. Your Address">
            <FormControl
              v-model="model.address"
               type="text"
              name="address"
              required
              autocomplete="address"
            />
          </FormField>
          <div class="grid grid-cols-2 gap-2">
            <FormField label="Company TIN" help="Required. Your Company TIN Reg.No">
              <FormControl
                v-model="model.Tin"
                 type="text"
                name="tin"
                 autocomplete="tin"
              />
            </FormField>
            <FormField label="Company VAT" help="Required. Your Company VAT Reg.No">
              <FormControl
                v-model="model.Vat"
                 type="text"
                name="vat"
                 
                autocomplete="vat"
              />
            </FormField>
           </div>
      
        
          <template #footer>
            <BaseButtons  >
               
              <button   :disabled="loading" type="submit" class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
              
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
