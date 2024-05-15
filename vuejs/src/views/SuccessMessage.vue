<script setup>
import { ref, computed } from "vue";
import { useStyleStore } from "@/stores/style.js";
import {
  mdiContrastCircle,
  mdiInformation,
  mdiCheckCircle,
  mdiAlert,
  mdiAlertCircle,
  mdiOpenInNew,
  mdiClose,
  mdiReload,
  mdiTrendingUp,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
 import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import PillTag from "@/components/PillTag.vue";
 
</script>

<template>
     

    <SectionMain>
      

      <NotificationBar
      class="mt-12"
        color="success"
        :icon="mdiCheckCircle"
        :outline="notificationsOutline"
      >
        <b>Your data successfully sent </b>. Thank you!

        <b class="ml-4">የባንክ ደረሰኝዎ በተሳካ ሁኔታ ተልኳል
           </b>. እናመሰግናለን!

        
        <template #right>
       
        </template>
      </NotificationBar>

    
    </SectionMain>

   

    <SectionMain>
     

      

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
 </template>
