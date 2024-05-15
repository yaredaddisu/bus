<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiAccountPlus,
  mdiMonitor,
  mdiSitemap,
  mdiGroup,
} from "@mdi/js";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { PurpleToBlue } from "@/colors";
import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";

import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import axiosClient from "../axios.js";
import OverlayLayer from "@/components/OverlayLayer.vue";
 import TableUser from "@/components/TableUser.vue";

import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const data = computed(() => store.state.user.data);
const isSuperAdmin = computed(() => {
  const superAdminValue = parseInt(data.value.is_super_admin, 10) === 1;
  // console.log("Is Super Admin:", superAdminValue);
  return superAdminValue;
});
const isAdmin = computed(() => {
  const AdminValue = parseInt(data.value.is_admin, 10) === 1;
  //console.log("Is   Admin:", AdminValue);
  return AdminValue;
});

//const loading = computed(() => store.state.dashboard.loading);
const totalProduct = computed(() => store.state.dashboard.data);
const ProductLoading = computed(() => store.state.loading.data);

store.dispatch("getDashboardData");

const created_atOptions = computed(() => store.state.dateOptions);

const chosenDate = ref("all");

const isModalActive = ref(false);

const chartData = ref(null);

const productsCount = ref(0);
const quantityCount = ref(0);

const loading = ref({
  customersCount: true,
  totalIncome: true,
  topMembers: true,
  latestMembers: true,
  todayMembers: true,
  monthMembers: true,
  yearMembers: true,
  inactiveCustomers: true,
  userCount: true,
  expired: true,
  productsCount: true,
  ///
  usersIncome: true,
  UserYear: true,
  todayUser: true,
  monthUser: true,
  quantityCount: true,
});

const d = chosenDate.value;

function updateDashboard() {
  d;
  loading.value = {
    customersCount: true,
    totalIncome: true,
    topMembers: true,
    latestMembers: true,
    todayMembers: true,
    monthMembers: true,
    yearMembers: true,
    inactiveCustomers: true,
    userCount: true,
    expired: true,
    productsCount: true,
    ///<--!users-->
    usersIncome: true,
    UserYear: true,
    todayUser: true,
    monthUser: true,
    quantityCount: true,
  };
}

axiosClient.get(`/dashboard `, { d }).then(({ data }) => {
  quantityCount.value = data;
  loading.value.quantityCount = false;
});

store.dispatch("getUser");

let userID = ref("");

onMounted(() => {
  updateDashboard();
});
</script>

<template>
  <div role="status" v-if="loading.value">
    <OverlayLayer />
  </div>

  <CardBoxModal v-model="isModalActive" has-cancel> </CardBoxModal>
  <LayoutAuthenticated class="w-full">
    <SectionMain>
      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
      <SectionTitleLineWithButton :icon="mdiSitemap" title="Product Dashboard  " />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          v-if="!loading.productsCount.totalPrice"
          :class="TealToLime"
          trend-type="up"
          color="text-white"
          :icon="mdiCartOutline"
          :number="productsCount.totalPrice"
          :total="productsCount.totalPrice"
          prefix="ETB"
          label="Total Invested Price "
        />
        <CardBoxWidget
          v-if="!loading.productsCount.totalSold"
          :class="RedToYellow"
          trend-type="down"
          color="text-white"
          :icon="mdiCartOutline"
          :total="productsCount.totalSold"
          :number="productsCount.totalSold"
          prefix="ETB "
          label="Total Sold"
        />
        <CardBoxWidget
          v-if="!loading.productsCount.profit"
          :class="GreenToBlue"
          trend-type="down"
          color="text-white"
          :icon="mdiCartOutline"
          :total="productsCount.profit"
          :number="productsCount.profit"
          prefix="ETB "
          label="Total Profit Gain "
        />
      </div>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          v-if="!loading.quantityCount.total_quantity"
          :class="TealToLime"
          trend-type="up"
          color="text-white"
          :icon="mdiCartOutline"
          :number="quantityCount.total_quantity"
          :total="quantityCount.total_quantity"
          prefix=" "
          label="Total Quantity  "
        />
        <CardBoxWidget
          v-if="!loading.quantityCount.sold_count"
          :class="RedToYellow"
          trend-type="down"
          color="text-white"
          :icon="mdiCartOutline"
          :total="quantityCount.sold_count"
          :number="quantityCount.sold_count"
          prefix="  "
          label="Total Quantity Sold"
        />
        <CardBoxWidget
          v-if="!loading.quantityCount.remaining"
          :class="GreenToBlue"
          trend-type="down"
          color="text-white"
          :icon="mdiCartOutline"
          :total="quantityCount.remaining"
          :number="quantityCount.remaining"
          prefix="  "
          label="Total Quantity Remaining"
        />
      </div>

      <SectionTitleLineWithButton :icon="mdiMonitor" title="User Dashboard">
      </SectionTitleLineWithButton>

      <CardBox class="mb-10">
        <div>
          <line-chart class="h-96" :stockInMap="stockInMap" />
        </div>
      </CardBox>
      <div v-if="isSuperAdmin || isAdmin">
        <SectionTitleLineWithButton :icon="mdiAccountMultiplePlus" title="Users" />

        <CardBox has-table>
          <TableUser />
        </CardBox>
      </div>
      <SectionTitleLineWithButton :icon="mdiSitemap" title="Products" />


    </SectionMain>
  </LayoutAuthenticated>
</template>
