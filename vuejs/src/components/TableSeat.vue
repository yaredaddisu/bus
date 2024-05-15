<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxMember from "@/components/CardBoxMember.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormControl from "@/components/FormControl.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import cityView from "@/views/City/cityView.vue";
import store from "../store";
import Notification from "@/components/Notification.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import OverSpin from "./OverSpin.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

//const items = computed(() => mainStore.seats)
const route = ref("All Routes");

const search = ref("");
const sortField = ref("updated_at");
const sortDirection = ref("desc");
let keyword = ref(new Date().toISOString().substr(0, 10));

const seats = computed(() => store.state.seats.data);
const routes = computed(() => store.state.routes.data);

const loading = computed(() => store.state.seats.loading);

store.dispatch("getSeats", { search: search.value });
store.dispatch("getRoutes");

watch([keyword, search,route], ([newKeyword,newRoute, newSearch], [oldKeyword,oldRoute, oldSearch]) => {
  store.dispatch("getSeats", {
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
       keyword: newKeyword,
       route: route.value,

  });
});
function getSeats(url = null) {
  store.dispatch("getSeats", {
    url,
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
       keyword: keyword.value,
       route: route.value,

  });
}

onMounted(() => {
  getSeats();
  keyword.value;

});

function sortseats(field) {
  if (field === sortField.value) {
    if (sortDirection.value === "desc") {
      sortDirection.value = "asc";
    } else {
      sortDirection.value = "desc";
    }
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  getSeats();
}

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  seats.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(seats.value.length / perPage.value));

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

const data = ref({
  id: "",
});
const del = ref("");

let deleteModel = ref(false);

function deleteMember(id) {
  deleteModel.value = !deleteModel.value;
  del.value = id;
  // alert(del.value)
}
function yesDelete(del) {
  store.dispatch("deleteMember", del).then((response) => {
    deleteModel.value = false;
    store.commit("notify", {
      type: "success",
      message: response.data.message,
    });
    //console.log(response.data.message)
    store.dispatch("getSeats");
  });
}

let deleteAllModel = ref(false);
const delVal = ref([]);

function deleteAll(checked) {
  deleteAllModel.value = !deleteAllModel.value;
  delVal.value = checked;
  // alert(del.value)
}
function yesDeleteAll(delVal) {
  deleteAllModel.value = false;

  if (delVal.length) {
    store.dispatch("deleteAllCity", delVal).then(() => {
      store.commit("notify", {
        type: "success",
        message: "City was successfully deleted!",
      });
      store.dispatch("getSeats");
    });
  }
}
let showModal = ref(false);

function openModal(id) {
  showModal.value = !showModal.value;
  data.value.id = id;
  //store.dispatch("showMember");

  //alert(  data.value.id)
}
const checked = ref([]);
const selected = ref([]);
const selectAll = ref(false);

function select() {
  selected.value = [];
  if (!selectAll.value) {
    for (let i in seats.value) {
      selected.value.push(seats.value[i]);
    }
  }
}

function updateCheckall() {
  if (seats.value.length == selected.value.length) {
    selectAll.value = true;
  } else {
    selectAll.value = false;
  }
}
</script>

<template>
   <div
    v-if="deleteModel"
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center max-h-full"
  >
    <OverlayLayer>
      <div class="relative p-4 w-full max-w-md max-h-full">
         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click="deleteMember()"
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this supplier?
            </h3>
            <button
              @click="yesDelete(del)"
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I'm sure
            </button>
            <button
              @click="deleteMember()"
              data-modal-hide="popup-modal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </OverlayLayer>
  </div>

  <div
    v-if="deleteAllModel"
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center max-h-full"
  >
    <OverlayLayer>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click="deleteAll()"
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete?
            </h3>
            <button
              @click="yesDeleteAll(delVal)"
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I'm sure
            </button>
            <button
              @click="deleteAll()"
              data-modal-hide="popup-modal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </OverlayLayer>
  </div>
  <CardBoxMember v-if="showModal" @openModal="openModal" title="Update Seat " has-cancel>
    <cityView :id="data.id" />
  </CardBoxMember>
  <Notification />

  <div v-if="loading"><OverSpin /></div>

  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <select
            @change="getSeats(null)"
            v-model="perPage"
            class="appearance-none block w-24 px-3 py-2 border dark:bg-gray-900 dark:text-white border-gray-300] placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="w-auto" id="navbar-cta">
          <div
            class="flex flex-row text-xs font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <div v-if="selected.length">
              <button
                @click="deleteAll(selected)"
                class="block dark:text-white mt-2 dark:hover:bg-slate-800 hover:text-slate-500 text-center rounded-lg pl-3 pr-3 pt-0 pb-0 border border-slate-600 text-xs"
              >
                Delete
              </button>
              <span></span>
            </div>

            <div v-if="selected.length">
              <div
                class="block py-2 px-3 md:p-0 rounded md:bg-transparent"
                aria-current="page"
              >
                Selected
                <b class="border border-gray-600 p-1 rounded-full">{{
                  selected.length
                }}</b>
              </div>
            </div>
            <div>
              <div
                href="#"
                class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Total
                <b class="border border-slate-500 p-1 rounded-full">{{ seats.length }}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div class="w-full">
            <input
            type="date"
              id="countries"
              v-model="keyword"
              class="bg-gray-50 py-2.5 px-5 mr-2 mb-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           />

          </div></div>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div  class="flex flex-wrap">
              Filter By Route
              <div class="w-full">
                <select
                  id="countries"
                  v-model="route"
                  class="bg-gray-50 py-2.5 px-5 mr-2 mb-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option class="text-xl font-semibold" selected>All Routes</option>
                  <option
                    class="text-xl font-semibold"
                    @click="getData()"
                    v-for="route in routes"
                    :key="route.id"
                    :value="route.id"
                  >
                    {{ route.source_city }} - {{ route.destination_city }}
                  </option>
                </select>
              </div>
            </div>


            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative float-right mt-3 mr-3">
              <FormControl
                placeholder="Search (ctrl+k)"
                ctrl-k-focus
                transparent
                borderless
                v-model="search"
                type="search"
              />
            </div>
          </div>
       </div>
    </nav>
    <div class="overflow-x-auto w-full">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model="selectAll" @click="select()" />
            </th>
            <th />
            <th
              field="busNumber"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortseats('busNumber')"
            >
              Bus Number
            </th>
            <th
              field="busType"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortseats('busType')"
            >
              Bus Type
            </th>
            <th
            field="source_city"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortseats('source_city')"
          >
           Route
          </th>
          <th
          field="journeyDate"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          @click="sortseats('journeyDate')"
        >
        Journey Date
        </th>
            <th
              field="status"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortseats('status')"
            >
              status
            </th>

            <th
              field="updated_at"
              :sort-field="sortField"
              :sort-direction="sortDirection"
              @click="sortseats('updated_at')"
            >
              Updated At
            </th>
            <th>Actions</th>
            <th />
          </tr>
        </thead>

        <tbody>
          <tr v-for="city in itemsPaginated" :key="city.id">
            <td>
              <input
                type="checkbox"
                :value="city"
                v-model="selected"
                @change="updateCheckall()"
              />
            </td>
            <td class="lg:w-6 before:hidden"></td>
            <td data-label="City">
              {{ city.bus.busNumber }}
            </td>
            <td data-label="City">
              {{ city.bus.type }}
            </td>
  <td data-label="Route">
              {{ city.route.source_city }} -   {{ city.route.destination_city }}
            </td>
<td data-label="Journey Date">
              {{ city.journeyDate }}
            </td>

            <td data-label="Status">
              <span
                class="rounded-full px-3 py-1 text-sm font-semibold border mr-2 mb-2"
                :class="[
                  city.bus.availability == 1
                    ? 'text-green-800 border-green-500 '
                    : 'text-red-500 border-red-500 ',
                ]"
                >{{ city.bus.availability == 1 ? "Active" : "In Active" }}
              </span>
            </td>
            <td data-label="Created" class="lg:w-1 whitespace-nowrap">
              <small class="text-gray-500 dark:text-slate-400" :title="city.updated_at">{{
                city.updated_at
              }}</small>
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Options
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute cursor-pointer right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <router-link :to="{ name: 'PassengerView', params: { id: city.id } }"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Passenger List  </router-link>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <router-link :to="{ name: 'SeatsView', params: { id: city.id } }"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Seats List  </router-link>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a                   @click="openModal(city.id)"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Seat</a>
                      </MenuItem>
                      <form method="POST" action="#">
                        <MenuItem v-slot="{ active }">
                          <button type="submit" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
                        </MenuItem>
                      </form>
                    </div>




                      <BaseButton
                      class="ml-4"
                        color="danger"
                        :icon="mdiTrashCan"
                        small
                        @click="deleteBus(city.id)"
                      />
                   </MenuItems>
                </transition>
              </Menu>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="!seats.length" class="w-full">
    <CardBox>
      <CardBoxComponentEmpty class="py-[60px]" />
    </CardBox>
  </div>
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
</template>
