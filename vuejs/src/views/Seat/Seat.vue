<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiBus,
  mdiSeatReclineExtra,
} from "@mdi/js";
import CardBoxMember from "@/components/CardBoxMember.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableSeat from "@/components/TableSeat.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import SeatView from "@/views/Seat/SeatView.vue";

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
          <SectionTitleLineWithButton :icon="mdiSeatReclineExtra" title="Seats" main>
          </SectionTitleLineWithButton>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <BaseButton
              target="_blank"
              :icon="mdiSeatReclineExtra"
              label="Add  Seat"
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
        title="Create Seat "
        has-cancel
      >
        <SeatView />
      </CardBoxMember>

      <CardBox class="mb-6" has-table>
        <TableSeat checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
