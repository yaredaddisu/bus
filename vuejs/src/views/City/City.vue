<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiBus,
  mdiCityVariantOutline,
} from "@mdi/js";
import CardBoxMember from "@/components/CardBoxMember.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableCity from "@/components/TableCity.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import cityView from "@/views/City/cityView.vue";

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
          <SectionTitleLineWithButton :icon="mdiCityVariantOutline" title="Cities" main>
          </SectionTitleLineWithButton>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <BaseButton
              target="_blank"
              :icon="mdiCityVariantOutline"
              label="Add  City"
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
        title="Create City "
        has-cancel
      >
        <cityView />
      </CardBoxMember>

      <CardBox class="mb-6" has-table>
        <TableCity checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
