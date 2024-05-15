<script setup>
import { reactive, ref, computed, onMounted, watch, watchEffect } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import { useRouter, useRoute } from "vue-router";
import store from "@/store";
import Error from "@/components/Error.vue";
import Notification2 from "@/components/Notification2.vue";
import axiosClient from "@/axios";
import FormField from "@/components/FormField.vue";

import FormControl from "@/components/FormControl.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();

const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);
const cities = computed(() => store.state.cities.data);

store.dispatch("getCities");

const props = defineProps({
  id: String,
});

let model = ref({
  source_city: "",
  destination_city: "",
  price: "",
  distance: "",
  duration: "",
  departure_time: "",
  arrival_time: "",
  status: false,
});
if (props.id) {
  store.dispatch("showRoute", { id: props.id });
}

// instead, use a getter:

watch(
  () => store.state.currentRoute.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);
/*
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
const todoId = ref(props.id)
const data = ref(null)
watch(
  todoId,
    () => {
    return axiosClient.get( `/members/${todoId.value}`)
      .then(res => {
       model.value = res.data.data
       console.log( model)

      })

  },
  { immediate: true }
)
\
const todoId = ref(props.id)
const data = ref(null)

watchEffect(async () => {
  return axiosClient.get( `/members/${todoId.value}`)
      .then(res => {
       model.value = res.data.data
       console.log( model)

      })
})
*/

const success = ref("");
const errors = ref([]);
const loading = ref(false);

function addRoute() {
  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  loading.value = true;

  store
    .dispatch("addRoute", { ...model.value })
    .then(({ data }) => {
      loading.value = false;
      if (!model.value.id) {
        model.value = [];
      }
      store.commit("notify", {
        type: "success",
        message: data.message,
      });
      success.value = data.message;
      //console.log(data.message)
      store.dispatch("getRoutes");
    })
    .catch((error) => {
      loading.value = false;

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
        setTimeout(() => {
          errors.value = false;
        }, 5000);
      }
    });
}
</script>

<template>
  <div>
    <div class=" ">
      <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field] || []" :key="ind">* {{ error }}</div>
        </div>
      </Alert>
      <!-- Modal body -->
      <div class="p-4 md:p-5">
        <form class="space-y-4" @submit.prevent="addRoute">
          <Notification2 />
          <Error />
          <div>
            <label for="city" class="block text-sm font-medium text-gray-100">From</label>
            <select
              id="city"
              v-model="model.source_city"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="" disabled>From</option>
              <option v-for="city in cities" :key="city.id" :value="city.cityName">
                {{ city.cityName }}
              </option>
            </select>
          </div>
          <div>
            <label for="city" class="block text-sm font-medium text-gray-100">To</label>
            <select
              id="city"
              v-model="model.destination_city"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="" disabled>To</option>
              <option v-for="city in cities" :key="city.id" :value="city.cityName">
                {{ city.cityName }}
              </option>
            </select>
          </div>

          <div>
            <input
              v-model="model.price"
              type="number"
              name="price"
              id="price"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Price"
            />
          </div>
          <div>
            <input
              v-model="model.distance"
              type="number"
              name="distance"
              id="distance"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Distance"
            />
          </div>
          <div>
            <input
              v-model="model.duration"
              type="number"
              name="duration"
              id="duration"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Duration"
            />
          </div>
          <div>
            <input
              v-model="model.departure_time"
              type="time"
              name="departure_time"
              id="departure_time"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Departure Time"
            />
          </div>
          <div>
            <input
              v-model="model.arrival_time"
              type="time"
              name="arrival_time"
              id="arrival_time"
              class="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Arrival Time"
            />
          </div>
          <div>
            <label class="m-2" for="">Status</label>
            <input
              v-model="model.status"
              type="checkbox"
              name="status"
              id="status"
              placeholder="Bus  Status"
            />
          </div>

          <button
            :disabled="loading"
            type="submit"
            class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-slate-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
            :class="{ 'cursor-not-allowed': loading, 'hover:bg-slate-700': loading }"
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
            {{ model.id ? "Update Route" : "Create Route" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
