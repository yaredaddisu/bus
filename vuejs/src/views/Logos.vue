<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
 mdiAccountBoxMultiple,
 mdiCameraImage
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableLogos from "@/components/TableLogos.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
 import store from "../store";
import OverlayLayer from "@/components/OverlayLayer.vue";

 import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

store.dispatch('getLogos');


function goTo(){
  store.dispatch('getLogos');
router.push('/logos/create');
}

</script>

<template>
   


 
  <LayoutAuthenticated>
    
    <SectionMain>
    
      <SectionTitleLineWithButton :icon="mdiCameraImage" title="Logos" main>
        
        
        <BaseButton
           target="_blank"
          :icon="mdiCameraImage"
          label="Add logo"
          color="contrast"
          rounded-full
          small
          @click="goTo"

        />
        
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableLogos checkable />
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
