<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import store from "../store";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm", "openModal"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};
function openModal() {
  emit("openModal");
}

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
    store.dispatch("getWarehouses");
  }
});
</script>

<template>
  <OverlayLayer @overlay-click="cancel">
    <div
      class="transform overflow-auto dark:text-white bg-white dark:bg-slate-800 p-3 text-left shadow-3xl transition-all sm:my-8 w-full max-w-lg"
    >
      <div>
        <CardBoxComponentTitle :title="title" class=" ">
          <BaseButton
            v-if="hasCancel"
            :icon="mdiClose"
            color="whiteDark"
            small
            rounded-full
            @click.prevent="openModal()"
          />
        </CardBoxComponentTitle>
        <hr />
        <div class="space-y-3">
          <slot />
        </div>
      </div>
    </div>
  </OverlayLayer>
</template>
