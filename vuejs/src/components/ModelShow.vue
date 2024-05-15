<template>
  <button
    @click="toggleModal()"
    type="button"
    :icon="mdiHistory"
    data-modal-target="crypto-modal"
    data-modal-toggle="crypto-modal"
    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
  >
    History
  </button>

  <!-- Main modal -->
  <div
    id="crypto-modal"
    v-if="showModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-auto overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full drop-shadow-2xl rounded-xl">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          v-on:click="toggleModal()"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-hide="crypto-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>

        <!-- Modal header -->
        <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-start font-semibold text-gray-900 lg:text-xl dark:text-white">
            History Of {{ member.productName }}
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 overflow-scroll h-[450px]">
          <p class="text-sm font-normal mt-4 text-gray-500 dark:text-gray-400">
            Single products history and Previous ,Stock Out, Stock In and Remaining
            Quantity.
          </p>
          <div>
            <ul v-for="mem in member.products" :key="mem.id" class="my-4 space-y-3">
              <li>
                <div
                  class="grid grid-cols-2 gap-4 items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <div v-if="mem.Transaction === 'Stock Out'">
                    <span class="flex-1 ml-3 text-red-500 whitespace-nowrap"
                      >{{ mem.Transaction }}
                    </span>
                  </div>
                  <div v-else>
                    <span class="flex-1 ml-3 text-green-500 whitespace-nowrap"
                      >{{ mem.Transaction }}
                    </span>
                  </div>
                  <div>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >{{ mem.productName }}
                    </span>
                  </div>

                  <div>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                    >
                      {{ mem.created_at }}</span
                    >
                  </div>

                  <div class="grid grid-cols-3 overflow-x-auto">
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                      ><strong class="text-green-500 mr-3">{{ mem.previous }}</strong>
                    </span>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                    >
                      <strong class="text-red-500">{{ mem.quantity }}</strong>
                    </span>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                    >
                      <strong class="text-sky-500 ml-4">{{ mem.remaining }}</strong></span
                    >
                  </div>
                  <div v-if="mem.Transaction === 'Stock Out'">
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                      >Sales Price
                      <strong class="text-green-500 ml-3">
                        {{ $filters.currencyUSD(mem.salesPrice) }}</strong
                      >
                    </span>
                  </div>
                  <div v-if="mem.Transaction === 'Stock Out'">
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                      >Profit
                      <strong class="text-green-500 ml-3">
                        {{ $filters.currencyUSD(mem.profit) }}</strong
                      >
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="showStockIn">
            <ul v-for="stock in member.stocks" :key="stock.id" class="my-4 space-y-3">
              <li>
                <div
                  class="grid grid-cols-2 gap-4 items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <div v-if="stock.Transaction === 'Stock Out'">
                    <span class="flex-1 ml-3 text-red-500 whitespace-nowrap"
                      >{{ stock.Transaction }}
                    </span>
                  </div>
                  <div v-else>
                    <span class="flex-1 ml-3 text-green-500 whitespace-nowrap"
                      >{{ stock.Transaction }}
                    </span>
                  </div>
                  <div>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >{{ stock.productName }}
                    </span>
                  </div>

                  <div>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                    >
                      {{ stock.created_at }}</span
                    >
                  </div>

                  <div class="grid grid-cols-3 overflow-x-auto">
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                      ><strong class="text-green-500 mr-3">{{ stock.previous }}</strong>
                    </span>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                    >
                      <strong class="text-red-500">{{ stock.quantity }}</strong>
                    </span>
                    <span
                      class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-md font-bold rounded dark:text-gray-400"
                    >
                      <strong class="text-sky-500 ml-4">{{
                        stock.remaining
                      }}</strong></span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { mdiHistory } from "@mdi/js";
import router from "@/router";

function stockOut() {
  router.push("/stock-out");
}
function stockIn() {
  router.push("/stock-in");
}

const props = defineProps({
  modelValue: Boolean,
  member: {
    required: true,
    type: Object,
  },
});

const showModal = ref(false);
const showStockIn = ref(false);

function toggleStockIn() {
  showStockIn.value = !showStockIn.value;
}
function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<style></style>
