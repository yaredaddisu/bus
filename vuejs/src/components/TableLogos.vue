<script setup>
import { reactive,computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import store from "../store";
import OverlayLayer from "@/components/OverlayLayer.vue";
import router from "@/router";

defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

const items = computed(() => store.state.logos.data);
const loading = computed(() => store.state.logos.loading);

store.dispatch('getLogos');

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checked  = ref([]);


const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

function createLogo(){
router.push('/logos/create')
store.dispatch("getLogos");

}

const itemsPaginated = computed(() =>
items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

function deleteLogoAll(checked){
 if(checked.length){
  if(confirm(`Are you sure you want to delete this logo? Operation can't be undone!!`
))
{
store.dispatch('deleteLogoAll', checked)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'Logo was successfully deleted!'
  })
store.dispatch('getLogos');
})
}
 }else{
  store.commit('notify', {
    type: 'success',
    message: 'No data selected to delete'
  })
 }

}

function deleteLogo(client){
  
if(confirm(`Are you sure you want to delete this logo? Operation can't be undone!!`
))
{
store.dispatch('deleteLogo', client.id)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'Logo was successfully deleted!'
  })
store.dispatch('getLogos');
})

}
}
//const checked = ref([]);

function checkAll(){

this.isCheckAll = !this.isCheckAll;
this.checked = [];
if(this.isCheckAll){ // Check all
  for (var key in this.items) {
    this.checked.push(this.items[key]);
  }
}
};
function updateCheckall(){
if(this.checked.length == this.items.length){
   this.isCheckAll = true;
}else{
   this.isCheckAll = false;
}
};
store.dispatch("getUser");


</script>

<template>
 



 <div>
 <div class="border">

   <div class="flex items-center float-left mt-3 ml-3">

    <button
    @click="deleteLogoAll(checked)"
    type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete </button>
    <button
    @click="createLogo()"
     type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Logo</button>
 
  </div>
   </div>

  <table>
    <thead>
      <tr>
            <th>
               <input type='checkbox' @click='checkAll()' v-model='isCheckAll'>
        </th>
        <th>Image</th>
        <th>Status  </th>
        <th>Updated  </th>

        <th>Actions</th>

      </tr>
    </thead>
    <tbody v-if="loading || !items.length">
      <tr>
        <td colspan="6">
          <div v-if="loading">

            <OverlayLayer />
          </div>
          
          <div v-else class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1">
                <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-bold">Ooops Their is Something Error</p>
            <p class="text-sm">Their is no data found here.</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    <tbody v-else>
      <tr v-for="client in itemsPaginated" :key="client.id">

         <td>
             <input type='checkbox' :value='client' v-model='checked' @change='updateCheckall()'>
         </td>
        <td class="border-b-0 lg:w-6 before:hidden">
          <div class="relative w-[200px]   h-[200px] transition-all  rounded-md transform hover:scale-125">
            <img class="shadow-lg h-[200px] w-[200px]  max-w-full  align-middle border-none"  :src="client.image_url" alt="user image" />
           </div>
        </td>
        <td data-label="Status"
        :class="[
          client.status != 0
            ? 'text-green-800'
            : 'text-red-800',

        ]"
        >
          {{ client.status != 0 ? "Active" : "In Active"}}
        </td>
        <td data-label="Updated ">
          {{ client.updated_at }}
        </td>



        <td class="before:hidden lg:w-1 whitespace-nowrap">


          <BaseButtons type="justify-start lg:justify-end" no-wrap>

            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="{ name: 'LogoView', params: { id: client.id } }"
              />
            <BaseButton


            v-if="client.id"
              color="danger"
              :icon="mdiTrashCan"
              small
              type="button"
              @click="deleteLogo(client)"
              />
          </BaseButtons>

        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
 </div>



  

</template>
