<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus,
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
import TablePassengers from "@/components/TablePassengers.vue";
import FormField from "@/components/FormField.vue";
import router from "@/router";
import store from "../store";

const isModalActive = ref(false);

const use = computed(() => store.state.user.data);

function addUser() {
  router.push("/users");
}
</script>

<template>
  <CardBoxModal v-model="isModalActive" has-cancel> </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountPlus" title="User Sales Report" main>
        <BaseButton
          target="_blank"
          :icon="mdiAccountPlus"
          label="Users"
          color="contrast"
          rounded-full
          small
          @click="addUser()"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TablePassengers checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
