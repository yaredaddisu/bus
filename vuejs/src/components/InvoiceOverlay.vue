<script setup>
import { useStyleStore } from "@/stores/style.js";
import SampleInvoice from "@/components/SampleInvoice.vue";

defineProps({
  zIndex: {
    type: String,
    default: "z-50",
  },
  type: {
    type: String,
    default: "flex",
  },
  print:{
    type: Array,
  }
});

const emit = defineEmits(["overlay-click","toggleModal"]);

const overlayClick = (event) => {
  emit("overlay-click", event);
 
};
 
 

function toggleModal() {
  emit("toggleModal");
}



const styleStore = useStyleStore();
</script>

<template>
  <div
     :class="[type, zIndex]"
    class="items-center flex-col justify-center overflow-hidden fixed inset-0 "   
  >
    <transition
      enter-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"
        :class="styleStore.overlayStyle"
        @click="overlayClick"
        
      />
      
    </transition>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="animate-fade-out"
    >
    
      <slot />
    </transition>

       
    <div class="relative w-full max-w-md max-h-full overflow-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button @click="toggleModal()"  type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>

            <SampleInvoice :print="print"/>

          
          
        </div>
     </div>
  </div>
</template>

