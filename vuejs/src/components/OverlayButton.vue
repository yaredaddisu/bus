<script setup>
import { useStyleStore } from "@/stores/style.js";
import { mdiWhatsapp } from '@mdi/js';
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  zIndex: {
    type: String,
    default: "z-50",
  },
  type: {
    type: String,
    default: "flex",
  },
});

const emit = defineEmits(["overlay-click"]);

const overlayClick = (event) => {
  emit("overlay-click", event);
};

const styleStore = useStyleStore();
</script>

<template>
  <div
    :class="[type]"
    class="items-center   justify-end  overflow-hidden fixed   bottom-10 right-0"
  >
    
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fade-out"
    >
    
      <slot />
    </transition>
   

      <a target="_blank" href="http://t.me/lomiwebsite"  class="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            
 
        <BaseButton
          color="info"
          :icon="mdiWhatsapp"
          small
          class="animate-ping"
          label="
          "
           />
         
       Chat on telegram
       <span class="relative  h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>

      </span>
      </a>

  </div>
</template>
