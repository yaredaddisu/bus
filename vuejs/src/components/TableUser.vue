<script setup>
import { computed, ref, watch, onMounted } from "vue";
//import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import store from "@/store";
import router from "@/router";
import OverlayLayer from "@/components/OverlayLayer.vue";
import FormControl from "@/components/FormControl.vue";
import axiosClient from "../axios.js";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

import { excelParser } from "../excel-parser";

defineProps({
  checkable: Boolean,
});

const search = ref("");
const sortField = ref("updated_at");
const sortDirection = ref("desc");

const users = computed(() => store.state.users.data);
const loading = computed(() => store.state.users.loading);
const user = computed(() => store.state.user.data);

store.dispatch("getUsers", { search: search.value });

watch(search, (newValue, oldValue) => {
  store.dispatch("getUsers", {
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
  });
});
function getUsers(url = null) {
  store.dispatch("getUsers", {
    url,
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
  });
}

onMounted(() => {
  getUsers();
});

function sortusers(field) {
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

  getUsers();
}
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  getUsers(link.url);
}

function createUser() {
  router.push("/users/create");
  store.dispatch("getUsers");
}
function deleteUser(member) {
  if (confirm(`Are you sure you want to delete this user? Operation can't be undone!!`)) {
    store.dispatch("deleteUser", member.id).then(() => {
      store.commit("notify", {
        type: "success",
        message: "User was successfully deleted!",
      });
      store.dispatch("getUsers");
    });
  }
}

function deleteAllUser(checked) {
  if (checked.length) {
    if (
      confirm(`Are you sure you want to delete this user? Operation can't be undone!!`)
    ) {
      store.dispatch("deleteAllUser", checked).then(() => {
        store.commit("notify", {
          type: "success",
          message: "User was successfully deleted!",
        });
        store.dispatch("getUsers");
      });
    }
  } else {
    store.commit("notify", {
      type: "success",
      message: "No data checked To delete",
    });
  }
}
const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  users.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(users.value.length / perPage.value));

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

  arr.forEach((member) => {
    if (!cb(member)) {
      newArr.push(member);
    }
  });

  return newArr;
};

const isCheckAll = ref(false);

const checked = ref([]);

//const selectAll = ref(false);

function checkAll() {
  checked.value = [];
  if (!isCheckAll.value) {
    for (let i in users.value) {
      checked.value.push(users.value[i]);
    }
  }
}
function updateCheckall() {
  if (checked.value.length == users.length) {
    isCheckAll.value = true;
  } else {
    isCheckAll.value = false;
  }
}

store.dispatch("getUser");

const activeUsers = ref(0);
const InactiveUsers = ref(0);

function updateDashboard() {
  loading.value = {
    activeUsers: true,
    InactiveUsers: true,
  };
}

axiosClient.get(`/activeUsers`, {}).then(({ data }) => {
  activeUsers.value = data;
});
axiosClient.get(`/InactiveUsers`, {}).then(({ data }) => {
  InactiveUsers.value = data;
});
onMounted(() => {
  updateDashboard();
});

function exportCSV(index) {
  const sample = ref({
    questions: [],
  });

  checked.value.forEach((item, _) => {
    sample.value.questions.splice(index, 0, {
      id: item.id,
      UserName: item.name,
      organization: item.organization,
      phone: item.phone,
      email: item.email,
      created_at: item.created_at,
      updated_at: item.updated_at,
      day_left: item.day_left,
    });
  });

  excelParser().exportDataFromCsv(sample.value.questions, null, null);
}
function exportExcel(index) {
  const sample = ref({
    questions: [],
  });

  checked.value.forEach((item, _) => {
    sample.value.questions.splice(index, 0, {
      id: item.id,
      UserName: item.name,
      organization: item.organization,
      phone: item.phone,
      email: item.email,
      created_at: item.created_at,
      updated_at: item.updated_at,
      day_left: item.day_left,
    });
  });

  excelParser().exportDataFromExcel(sample.value.questions, null, null);
}
</script>

<template>
  <div class="border">
    <div class="grid lg:grid-cols-4 grid-cols-2 gap-4 items-center m-3">
      <select
        @change="getUsers(null)"
        v-model="perPage"
        class="appearance-none w-full mb-2 block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <div class="w-full">
        <Menu as="div" class="relative text-left">
          <div>
            <MenuButton
              :disabled="!checked.length"
              class="inline-flex w-full dark:bg-gray-700 dark:text-gray-400 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Export User
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition   ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute dark:bg-gray-700 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }" @click="exportCSV()">
                  <a
                    :class="[
                      active
                        ? 'courser-pointer bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                        : 'text-gray-700 dark:text-white ',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Export CSV</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="exportExcel()">
                  <a
                    :class="[
                      active
                        ? 'courser-pointer bg-gray-100  text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                        : 'text-gray-700 dark:text-white ',
                      'block px-4 py-2 text-sm',
                    ]"
                    >Export Excel</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <button
        @click="deleteAllUser(checked)"
        type="button"
        class="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Delete
      </button>

      <button
        @click="createUser()"
        type="button"
        class="w-full py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Create User
      </button>

      <span
        class="bg-blue-100 float-left mt-3 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
      >
        <svg
          aria-hidden="true"
          class="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Total Selected {{ checked.length }}
      </span>

      <span
        class="bg-blue-100 float-left mt-3 text-sky-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-sky-400 border border-sky-400"
      >
        <svg
          aria-hidden="true"
          class="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Total Users {{ users.length }}
      </span>
      <span
        class="bg-blue-100 float-left mt-3 text-sky-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-sky-400 border border-sky-400"
      >
        <svg
          aria-hidden="true"
          class="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Active Users {{ activeUsers }}
      </span>
      <span
        class="bg-blue-100 float-left mt-3 text-sky-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-sky-400 border border-sky-400"
      >
        <svg
          aria-hidden="true"
          class="w-3 h-3 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Total Users {{ InactiveUsers }}
      </span>
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

  <div class="overflow-x-auto w-full">
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
          </th>
          <th>Image</th>
          <th
            field="name"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortusers('name')"
          >
            Full Name
          </th>

          <th
            field="email"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortusers('email')"
          >
            Email Address
          </th>
          <th>Warehouse</th>

          <th>Role</th>

          <th
            field="status"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortusers('status')"
          >
            Status
          </th>

          <th
            field="updated_at"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortusers('updated_at')"
          >
            Updated
          </th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="loading || !users.length">
        <tr>
          <td colspan="12">
            <div v-if="loading">
              <OverlayLayer />
            </div>

            <div
              v-else
              class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div class="flex">
                <div class="py-1">
                  <svg
                    class="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-bold">Ooops Their is Something Error</p>
                  <p class="text-sm">Their is no data found here.</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="member in itemsPaginated" :key="member.id">

          <td v-if="member.is_super_admin == 0">
            <input
              type="checkbox"
              :value="member"
              v-model="checked"
              @change="updateCheckall()"
            />
          </td>
          <td v-else-if="member.is_super_admin == 1 && member.id !== user.id"></td>

          <td v-else-if="member.id === user.id">
            <input
              type="checkbox"
              :value="member"
              v-model="checked"
              @change="updateCheckall()"
            />
          </td>

          <router-link :to="{ name: 'UserReports', params: { id: member.id } }">
            <td>
              <span
                class="inline-flex items-center justify-center px-7 py-3 mr-2 text-xs font-bold leading-none text-white bg-green-600 rounded-md"
                >See Reports</span
              >
              <img
                class="shadow-lg rounded-full w-11 h-11 align-middle border-none"
                :src="member.image_url"
                alt="user image"
              />
            </td>
          </router-link>
          <td data-label="FullName" class="mr-6">
            {{ member.name }}
          </td>
          <td data-label="Email" class="mr-6">
            {{ member.email }}
          </td>
          <td data-label="Email" class="mr-6">
            <pre v-if="member.house">{{ member.house.name }}</pre>
            <pre v-else>No Warehouse</pre>
          </td>

          <td
            data-label="Is Admin"
            :class="[member.is_admin != 0 ? 'text-sky-800' : 'text-rose-500']"
          >
            {{ member.is_admin != 0 ? "Admin" : "User" }}
          </td>

          <td
            data-label="Status"
            :class="[member.status != 0 ? 'text-green-500' : 'text-red-500']"
          >
            {{ member.status != 0 ? "Active" : "In Active" }}
          </td>

          <td data-label="Updated Date" class="lg:w-1 whitespace-nowrap">
            <small class="text-gray-500 dark:text-slate-400">{{
              member.updated_at
            }}</small>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons
              v-if="member.is_super_admin == 0"
              type="justify-start lg:justify-end"
              no-wrap
            >
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                :to="{ name: 'UserView', params: { id: member.id } }"
              />

              <BaseButton
                v-if="user.id"
                color="danger"
                :icon="mdiTrashCan"
                small
                type="button"
                @click="deleteUser(member)"
              />
            </BaseButtons>

            <BaseButtons
              v-else-if="user.id === member.id"
              type="justify-start lg:justify-end"
              no-wrap
            >
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                :to="{ name: 'UserView', params: { id: member.id } }"
              />
              <BaseButton
                v-if="member.id"
                color="danger"
                :icon="mdiTrashCan"
                small
                type="button"
                @click="deleteMember(member)"
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
