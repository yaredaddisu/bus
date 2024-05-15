<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiBus,
  mdiRoutes,
} from "@mdi/js";
import CardBoxMember from "@/components/CardBoxMember.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableRoutes from "@/components/TableRoutes.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import RoutesView from "@/views/Routes/RoutesView.vue";

const props = defineProps({
  isModalDangerActive: Boolean,
});

const isModalDangerActive = ref(false);

let showModal = ref(false);

function openModal() {
  showModal.value = !showModal.value;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <nav class=" ">
        <div class="flex flex-wrap items-center justify-between">
          <SectionTitleLineWithButton :icon="mdiRoutes" title="Routes" main>
          </SectionTitleLineWithButton>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <BaseButton
              target="_blank"
              :icon="mdiRoutes"
              label="Add  Route"
              color="contrast"
              rounded-full
              small
              @click="openModal()"
            />
          </div>
        </div>
      </nav>

      <CardBoxMember
        v-if="showModal"
        @openModal="openModal"
        title="Create Route "
        has-cancel
      >
        <RoutesView />
      </CardBoxMember>

      <CardBox class="mb-6" has-table>
        <TableRoutes checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
