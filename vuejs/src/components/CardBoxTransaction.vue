<script setup>
import { computed } from "vue";
import {
  mdiCashMinus,
  mdiCashPlus,
  mdiReceipt,
  mdiCreditCardOutline,
} from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import IconRounded from "@/components/IconRounded.vue";
import { TealToLime } from "@/colors";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 
  type: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  
});

function nFormatter(price, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return price >= item.value;
  });
  return item ? (price / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

 
 
 


const icon = computed(() => {
  if (props.type === "withdrawal") {
    return {
      icon: mdiCashMinus,
      type: "danger",
    };
  } else if (props.type === "deposit") {
    return {
      icon: mdiCashPlus,
      type: "success",
    };
  } else if (props.type === "invoice") {
    return {
      icon: mdiReceipt,
      type: "warning",
    };
  }

  return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
});
</script>

<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <div v-if="image_url" class="w-12 h-12 mr-6 " :username="firstname"
        >  <img class="rounded-full w-12 h-12" :src="image_url" :alt="firstname" >
      </div>
      <div v-else class="w-12 h-12 mr-6 " :username="firstname"
      >  <img class="rounded-full w-12 h-12" src="../assets/avator.png" :alt="firstname" >
    </div>
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ firstname }}  {{ lastname }}

          </h4>
          <p class="text-gray-500 dark:text-slate-400">
            <b>{{ created_at }}</b> 
          </p>
        </div>
      </BaseLevel>
     <button 
     :class="TealToLime"
     class="text-white"
     >
      Total Paid {{ nFormatter(price)   }}  
      
     </button>

    </BaseLevel>
  </CardBox>
</template>
