<script setup>
import { reactive, computed, ref, watch } from "vue";
import {
  mdiBallotOutline,
  mdiPhone,
  mdiAccount,
  mdiAsterisk,
  mdiMail,
  mdiGithub,
  mdiAccountPlus,
  mdiAccountMultiple,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import NotificationBar from "@/components/NotificationBar.vue";
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
import UpdateBoxModal from "@/components/UpdateBoxModal.vue";
import Notification from "@/components/Notification.vue";

const route = useRoute();
const router = useRouter();

const load = computed(() => store.state.currentUser.loading);
const user = computed(() => store.state.currentUser.data);
const use = computed(() => store.state.user.data);
const house = computed(() => store.state.house.data);
store.dispatch("getWarehouses");
const isSuperAdmin = computed(() => {
  const superAdminValue = parseInt(use.value.is_super_admin, 10) === 1;
  // console.log("Is Super Admin:", superAdminValue);
  return superAdminValue;
});
const isModalActive = ref(false);

let model = ref({
  id: "",
  name: "",
  password: "",
  password_confirmation: "",
  is_admin: false,
  status: false,
  email: null,
  image_url: null,
  is_super_admin: false,
  phone: "",
  house_id: "",
});

watch(
  () => store.state.currentUser.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

if (route.params.id) {
  store.dispatch("getUserManagment", route.params.id);
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

let errors = ref("");
const loading = ref(false);

function createUser() {
  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  loading.value = true;

  store
    .dispatch("createUser", { ...model.value })
    .then(({ data }) => {
      loading.value = false;

      store.commit("notify", {
        type: "success",
        message: "User was successfully " + action,
      });

      router.push({
        name: "UserView",
        params: { id: data.data.id },
      });
    })
    .catch((error) => {
      loading.value = false;

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
function Home() {
  store.dispatch("getUsers");
  router.push("/users");
}

function addUser() {
  router.push("/users/create").then(() => {
    window.location.reload(true);
  });
}

store.dispatch("getUser");
</script>

<template>
  <LayoutAuthenticated v-if="use.is_admin == 1">
    <SectionMain>
      <SectionTitleLineWithButton
        v-if="route.params.id"
        :icon="mdiAccountPlus"
        title="Edit User"
        class="font-bold"
        main
      >
        <BaseButton
          v-if="route.params.id"
          target="_blank"
          :icon="mdiAsterisk"
          label="Update Password"
          color="contrast"
          rounded-full
          small
          @click="isModalActive = true"
        />
        <BaseButton
          target="_blank"
          :icon="mdiAccountPlus"
          label="Add User"
          color="contrast"
          rounded-full
          small
          @click="addUser"
        />
      </SectionTitleLineWithButton>
      <SectionTitleLineWithButton
        v-else
        :icon="mdiAccountPlus"
        title="Add user"
        class="font-bold"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="shadow-xl">
        <div role="status" v-if="load">
          <OverlayLayer />
        </div>
        <form v-else @submit.prevent="createUser" autocomplete="off">
          <NotificationBarInCard
            :color="formStatusOptions[formStatusCurrent]"
            :is-placed-with-header="formStatusWithHeader"
          >
            <div class="block">
              <span>
                <h1 class="text-xl font-bold text-white float-left">
                  {{ route.params.id ? "Edit user" : "Add user" }}
                </h1>
              </span>

              <BaseButton
                class="w-[200px] float-left sm:ssm:msm:mt-3 md:float-right lg:float-right"
                target="_blank"
                :icon="mdiAccountPlus"
                label="Users"
                color="contrast"
                rounded-full
                small
                @click="Home"
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

          <FormField label="Personal Information">
            <FormControl
              v-model="model.name"
              :icon="mdiAccount"
              placeholder="First name"
            />
            <FormControl
              v-model="model.email"
              type="email"
              :icon="mdiMail"
              autocomplete="off"
              placeholder="Email address"
            />
          </FormField>

          <div>
            <label class="mb-2 last:mb-0 text-sm font-mediumtext-bold block font-bold"
              >Cover photo</label
            >
            <div
              class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
            >
              <div class="space-y-1 text-center">
                <img
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.name"
                  class="w-64 h-48 object-cover transition-all rounded-md transform hover:scale-125"
                />
                <span v-else>
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      @change="onImageChoose"
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <BaseDivider />

          <UpdateBoxModal v-model="isModalActive" has-cancel>
            <Notification />
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
            <FormField label="Personal Information" v-if="route.params.id">
              <FormControl
                v-model="model.password"
                :icon="mdiAsterisk"
                type="text"
                autocomplete="off"
                placeholder=" Enter password"
              />
              <FormControl
                v-model="model.password_confirmation"
                type="text"
                :icon="mdiAsterisk"
                autocomplete="off"
                placeholder="Enter password again"
              />

              <button type="submit" :class="PurpleToBlue" class="text-white">
                Update
              </button>
            </FormField>
          </UpdateBoxModal>

          <FormField label="Personal Information" v-if="!route.params.id">
            <FormControl
              v-model="model.password"
              :icon="mdiAsterisk"
              type="password"
              autocomplete="off"
              placeholder=" Enter password"
            />
            <FormControl
              v-model="model.password_confirmation"
              type="password"
              :icon="mdiAsterisk"
              placeholder="Enter password again"
            />
          </FormField>
          <FormField label="Warehouse">
            <select
              id="productSelect"
              v-model="model.house_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="(product, index) in house" :key="index" :value="product.id">
                {{ product.name }}
              </option>
            </select>
            <FormControl
              type="tel"
              name="phone"
              id="phone"
              :icon="mdiPhone"
              v-model="model.phone"
              placeholder="Enter  phone"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
            />
          </FormField>

          <!-- Status -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>
          <!--/ Status -->
          <!-- Status -->
          <div v-if="isSuperAdmin">
            <div v class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.is_admin"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="is_admin" class="font-medium text-gray-700">Is Admin</label>
              </div>
            </div>
            <!--/ Status -->
            <!-- Status -->
            <div class="flex items-start mt-6">
              <div class="flex items-center h-5">
                <input
                  id="is_super_admin"
                  name="is_super_admin"
                  type="checkbox"
                  v-model="model.is_super_admin"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="is_super_admin" class="font-medium text-gray-700"
                  >IS Super Admin</label
                >
              </div>
            </div>
          </div>
          <div class="px-6 py-5 text-right sm:px-6">
            <button
              :disabled="loading"
              type="submit"
              class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
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
              {{ route.params.id ? "Update" : "Save" }}
            </button>
          </div>
        </form>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
