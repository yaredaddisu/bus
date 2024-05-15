<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiBus,
} from "@mdi/js";
import CardBoxMember from "@/components/CardBoxMember.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableBus from "@/components/TableBus.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import busView from "@/views/Bus/busView.vue";

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
          <SectionTitleLineWithButton :icon="mdiBus" title="Buses" main>
          </SectionTitleLineWithButton>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <BaseButton
              target="_blank"
              :icon="mdiBus"
              label="Add  Bus"
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
        title="Create Bus "
        has-cancel
      >
        <busView />
      </CardBoxMember>

      <CardBox class="mb-6" has-table>
        <TableBus checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
