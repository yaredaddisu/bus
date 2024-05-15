<script setup>
import { reactive, computed, ref ,watch} from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail,mdiCameraImage, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple 
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
 import store from '../store';
 import { useRoute, useRouter } from "vue-router";
 import Alert from "@/components/Alert.vue";
 import Date from "@/components/Date.vue";
 import { PurpleToBlue } from "@/colors";
import OverlayLayer from "@/components/OverlayLayer.vue";

 
const route = useRoute();
const router = useRouter();
  
const logoLoading = computed(() => store.state.logos.loading);

const isModalActive = ref(false);


const loading = ref(false);

let model = ref({
   image_url: null,
   status: false,
 
});


// Watch to current survey data change and when this happens we update local model
watch(
  () => store.state.logos.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

// If the current component is rendered on survey update route we make a request to fetch survey
if (route.params.id) {
  store.dispatch("getLogo", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    model.value.image = reader.result;

    // The field to display here
    model.value.image_url = reader.result;
    ev.target.value = "";
  };
  
  reader.readAsDataURL(file);
}
 

/**
 * Create or update survey
 */
 let errors = ref('');

function saveLogo() {
  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  loading.value = true;

  store.dispatch("saveLogo", { ...model.value }).then(({ data }) => {
       loading.value = false;

    store.commit("notify", {
      type: "success",
      message: "The Logo was successfully " + action,
    });
    if (model.value.id) {
      store.dispatch('getLogos');
      router.push('/logos/create');
    
  }else{
    router.push({
      name: "LogoView",
      params: { id: data.data.id },
    });
 
  }
}).catch((error) => {
      loading.value = false;

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

function deleteLogo() {
  if (
    confirm(
      `Are you sure you want to delete this Logo? Operation can't be undone!!`
    )
  ) {
    store.dispatch("deleteLogo", model.value.id).then(() => {
      router.push({
        name: "Logos",
      });
    }).catch((error) => {
      loading.value = false;

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
  }
}
 


 

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info" ];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};

function listLogo(){
store.dispatch('getLogo');
router.push('/logos');

}
function AddLogo(){
  router.push('/logos/create').then(()=>{
    window.location.reload(true);

  });
}

function Logos(){
router.push('/Logos');
store.dispatch("getLogos")

//window.location.reload(true);

}
store.dispatch("getUser");

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
 
      <SectionTitleLineWithButton
      v-if=" route.params.id"
      :icon="mdiCameraImage"
      title="Edit logo"
      class="font-bold"
      main
    >
 
    <BaseButton
    target="_blank"
   :icon="  mdiCameraImage  "
   label="Add Logo"
   color="contrast"
   rounded-full
   small
   @click="AddLogo"
  
  />     
 
    </SectionTitleLineWithButton>
    <SectionTitleLineWithButton
    v-else 
    :icon="mdiCameraImage"
    title="Add logo"
    class="font-bold"
    main
  >
            

 


  </SectionTitleLineWithButton>
  
  
      <CardBox class="shadow-xl" >
        <div role="status" v-if="logoLoading">
           <OverlayLayer />
        </div>
        <form v-else @submit.prevent="saveLogo">
                  <NotificationBarInCard
        :color="formStatusOptions[formStatusCurrent]"
        :is-placed-with-header="formStatusWithHeader"
      >
      <div class="block ">
        <span
        >
         <h1  class="text-xl font-bold text-white float-left">

          {{ route.params.id ? "Edit logo" : "Add logo" }}
        </h1>

     
         </span
      >
    

     
   <BaseButton
   
   class="w-[200px] float-left sm:ssm:msm:mt-3 md:float-right lg:float-right" 
   target="_blank"
  :icon="  mdiCameraImage"
  label="Logos"
  color="contrast"
  rounded-full
  small
  @click="Logos"
 
 />
 
       </div>
        
      </NotificationBarInCard>
         
      <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field] || []" :key="ind">
            * {{ error }}
  
          </div>
  
        </div>
       </Alert>
    
    
        
        <div>
          <label class=" mb-2 last:mb-0 text-sm font-mediumtext-bold block font-bold ">Logo photo</label>
          <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div class="space-y-1 text-center">
      
             
              <img
              v-if="model.image_url"
              :src="model.image_url"
              :alt="model.name"
              class="w-64 h-48 object-cover transition-all  rounded-md transform hover:scale-125"
              />
      <span v-else>
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      
      </span>
             
      
              <div class="flex text-sm text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input 
                  @change="onImageChoose"
                  id="file-upload"  name="file-upload" type="file" class="sr-only" />
                </label>
               </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
          <!-- Status -->
          <div class="flex items-start mt-6">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium "
                >Active</label
              >
            </div>
          </div>
        <div class="px-6 py-5  text-right sm:px-6">

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
     {{ route.params.id ? "Update" : "Save" }}       
    </button>
          
        </div>
   
      </form>

      </CardBox>
    </SectionMain>
 
   </LayoutAuthenticated>
</template>
