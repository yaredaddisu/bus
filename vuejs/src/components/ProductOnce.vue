<script setup>
import { reactive, computed, onMounted, ref, watch } from "vue";
import {
  mdiBallotOutline,
  mdiShapePlus,
  mdiMapMarker,
  mdiAccount,
  mdiPhone,
  mdiMail,
  mdiGithub,
  mdiAccountPlus,
  mdiAccountMultiple,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import store from "../store";
import { useRoute, useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import Date from "@/components/Date.vue";
import { PurpleToBlue } from "@/colors";
import OverlayLayer from "@/components/OverlayLayer.vue";

import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const router = useRouter();

const load = computed(() => store.state.currentSurvey.loading);

const category = computed(() => store.state.category.data);

store.dispatch("getCategories");
const user = computed(() => store.state.user.data.id);

store.dispatch("getUser");
const isModalActive = ref(false);

const loading = ref(false);

const emit = defineEmits(["toggleCreateOnce"]);

function toggleCreateOnce() {
  emit("toggleCreateOnce");
}

const products = ref([]);

let model = ref({
  id: "",
  productName: "",
  user_id: user.value,
  barCode: "",
  purchasePrice: null,
  salesPrice: null,
  category_id: null,
  quantity: null,
  status: false,
  code: null,
  size: null,
  image_url: null,
  image: null,
  color: null,
  brand: null,
});

function addProduct(model) {
  products.value.push({
    id: model.id,
    user_id: model.user_id,
    productName: model.productName,
    barCode: Math.random().toString(10).slice(10),
    purchasePrice: model.purchasePrice,
    salesPrice: model.salesPrice,
    category_id: model.selected,
    quantity: model.quantity,
    status: model.status,
    code: model.code,
    size: model.size,
    color: model.color,
    brand: model.brand,
  });
}

function deleteProduct(item) {
  products.value = products.value.filter((q) => q !== item);
}

let errors = ref("");

function saveSurvey(products) {
  loading.value = true;

  store
    .dispatch("saveProductOnce", {
      products,
    })
    .then(({ data }) => {
      loading.value = false;

      store.commit("notify", {
        type: "success",
        message: "Product was successfully  Created",
      });
      products.value = [];
      store.dispatch("getAllProductList");
    })
    .catch((error) => {
      loading.value = false;

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      } else if (error.response.status === 423) {
        store.commit("notify", {
          type: "error",
          message: error.response.data.error,
        });
      }
    });
}
function addNewProduct() {
  router.push("/product-list/create").then(() => {
    window.location.reload(true);
  });
}

function listMember() {
  store.dispatch("getAllProductList");
  router.push("/product-list");
}

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};

store.dispatch("getUser");

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<template>
  <div class="relative w-auto my-6 mx-auto max-w-3xl dark:bg-gray-700">
    <!--content-->
    <div
      class="border-0 rounded-lg shadow-lg relative flex flex-col dark:bg-gray-700 w-full bg-white outline-none focus:outline-none"
    >
      <!--header-->
      <div
        class="flex items-start justify-between dark:text-gray-300 text-black p-5 dark:bg-gray-700 border-b border-solid border-slate-200 rounded-t"
      >
        <h3 class="text-2xl font-semibold">Add All Products Once</h3>
        <button
          v-on:click="toggleCreateOnce()"
          type="button"
          class="bg-white rounded-md dark:bg-gray-700 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Close menu</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!--body-->

      <div class="m-10">
        <form @submit.prevent="saveSurvey(products)">
          <CardBox
            class="shadow-xl mb-10"
            v-for="(item, index) in products"
            :key="item.id"
          >
            <NotificationBarInCard
              :color="formStatusOptions[formStatusCurrent]"
              :is-placed-with-header="formStatusWithHeader"
            >
              {{ index + 1 }}. {{ item.productName }}
            </NotificationBarInCard>
            <Alert
              v-if="Object.keys(errors).length"
              class="flex-col items-stretch text-sm"
            >
              <div v-for="(field, i) of Object.keys(errors)" :key="i">
                <div v-for="(error, ind) of errors[field] || []" :key="ind">
                  * {{ error }}
                </div>
              </div>
            </Alert>

            <div class="mb-4 mt-3">
              <div class="grid lg:grid-cols-2 mb-4 gap-8">
                <FormField label="Product Name">
                  <FormControl
                    class="m-2"
                    v-model="item.productName"
                    placeholder="Product Name"
                  />
                </FormField>

                <FormField label="Product Category">
                  <div
                    class="grid grid-cols-1 sm:grid-cols-1 ssm:grid-cols-1 msm:grid-cols-1"
                  >
                    <div class="gap-4">
                      <select
                        v-model="item.selected"
                        id="categories"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected value="Select Category ">Select Category</option>

                        <option v-for="cat in category" :key="cat.id" :value="cat.id">
                          {{ cat.category }}
                        </option>
                      </select>
                    </div>
                  </div>
                </FormField>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <FormField label="Product Purchase Price">
                  <FormControl
                    class="m-2"
                    v-model="item.purchasePrice"
                    type="number"
                    placeholder="Purchase Price"
                  />
                </FormField>

                <FormField label="Product Sales Price">
                  <FormControl
                    class="m-2"
                    v-model="item.salesPrice"
                    type="number"
                    placeholder="Sales Price"
                  />
                </FormField>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <FormField label="Bar Code ">
                  <FormControl class="m-2" v-model="item.barCode" placeholder="Barcode" />
                </FormField>

                <FormField label="Product Quantity ">
                  <FormControl
                    class="m-2"
                    type="number"
                    v-model="item.quantity"
                    placeholder="Product Quantity"
                  />
                </FormField>
              </div>
              <FormField label="Product Detail">
                <div
                  class="grid grid-cols-4 sm:grid-cols-1 ssm:grid-cols-1 msm:grid-cols-1"
                >
                  <FormControl
                    class="m-2"
                    v-model="item.code"
                    placeholder="Product Code"
                  />

                  <FormControl
                    class="m-2"
                    v-model="item.size"
                    placeholder="Product Size"
                  />
                  <FormControl
                    class="m-2"
                    v-model="item.color"
                    placeholder="Product Color"
                  />
                  <FormControl
                    class="m-2"
                    v-model="item.brand"
                    placeholder="Product Brand"
                  />
                </div>
              </FormField>

              <input type="hidden" v-model="item.invoice_id" />

              <!-- Status -->
              <div class="flex items-start mt-6">
                <div class="flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    v-model="item.status"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="status" class="font-medium">Active</label>
                </div>
              </div>
            </div>

            <hr style="border: 1px dashed rgb(131, 131, 131); margin: 2px auto" />

            <div class="flex items-center">
              <!-- Add new question -->
              <button
                type="button"
                @click="addProduct(model)"
                class="flex items-center text-lg py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add
              </button>
              <!--/ Add new question -->

              <!-- Delete question -->
              <button
                type="button"
                @click="deleteProduct(item)"
                class="flex items-center text-lg py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete
              </button>
              <!--/ Delete question -->
            </div>
          </CardBox>
          <button
            :disabled="loading || !products.length"
            type="submit"
            class="w-full flex dark:bg-gray-800 dark:hover:bg-gray-600 justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
            :class="{ 'cursor-not-allowed': loading, 'hover:bg-gray-700': loading }"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Save
          </button>
        </form>
      </div>

      <!--footer-->
      <div
        class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
      >
        <button
          class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          v-on:click="toggleCreateOnce()"
        >
          Close
        </button>
        <button
          class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          v-on:click="addProduct(model)"
        >
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>
