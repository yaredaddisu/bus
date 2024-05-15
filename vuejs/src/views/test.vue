<template>
  <div>
    <div>
      <input type="date" v-model="fromDate" @change="filterProducts" />
      <input type="date" v-model="toDate" @change="filterProducts" />
    </div>

    <div v-if="filteredProducts.length">
      <h2>Filtered Products</h2>
      <ul>
        <li v-for="product in filteredProducts" :key="product.id">
          {{ product.name }} - {{ product.date }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const products = ref([
  { id: 1, name: 'Product 1', date: '2024-05-10' },
  { id: 2, name: 'Product 2', date: '2024-05-11' },
  { id: 3, name: 'Product 3', date: '2024-05-12' },
  { id: 4, name: 'Product 4', date: '2024-05-13' },
]);

const fromDate = ref('');
const toDate = ref('');
const filteredProducts = ref([]);

// Watch for changes in fromDate and toDate
watch([fromDate, toDate], ([from, to]) => {
  filterProducts(from, to);
});

// Filter products based on selected date range
function filterProducts(from = '', to = '') {
  if (!from && !to) {
    filteredProducts.value = products.value;
    return;
  }

  function filterProducts(from = '', to = '') {
  console.log('Filtering products with date range:', from, to);

  // Filter logic...
}

}
</script>

<style scoped>
/* Add your styles here */
</style>
