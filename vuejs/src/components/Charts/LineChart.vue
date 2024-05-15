<template>
  <div>
    <div>
      <button
        v-for="(dataset, index) in datasets"
        :key="index"
        :style="{ backgroundColor: dataset.color }"
      >
        {{ dataset.label }}
        <span
          class="inline-flex ml-2 items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-white border rounded-full"
          >{{ dataset.value }}</span
        >
      </button>
    </div>
    <canvas ref="root" />
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { ref } from "vue";
import axios from "@/axios.js";
import {
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

export default {
  data() {
    return {
      root: null,
      chart: null,
      stockIn: [],
      stockOut: [],
      datasets: [
        {
          label: "StockIn Quantity",
          color: "#00D1B2",
          visible: true,
          value: 0,
        },
        {
          label: "StockOut Quantity",
          color: "#FF3860",
          visible: true,
          value: 0,
        },
        {
          label: "Total Price ETB (Stock Out)",
          color: "#209CEE",
          visible: true,
          value: 0,
        },
      ],
      stockInMap: 0,
      stockOutMap: 0,
      stockOutPriceMap: 0,
    };
  },

  mounted() {
    this.fetchstockin();
    this.root = this.$refs.root;
    Chart.register(
      LineElement,
      PointElement,
      LineController,
      LinearScale,
      CategoryScale,
      Tooltip,
      TimeScale
    );
  },

  methods: {
    fetchstockin() {
      axios
        .get("/linechart-reports")
        .then((res) => {
          this.stockIn = res.data.stockin;
          this.stockOut = res.data.stockout;
          this.createChart();
        })
        .catch((error) => {
          console.error("Error fetching stockin:", error);
        });
    },

    createChart() {
      if (!this.root) return;
      const ctx = this.root.getContext("2d");
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: "line",
        data: this.getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false,
            },
            x: {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM dd, yyyy",
                },
              },
              display: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },

    getChartData() {
      const stockInMap = new Map();
      const stockOutMap = new Map();
      const stockOutPriceMap = new Map();

      this.stockIn.forEach((product) => {
        this.datasets[0].value = product.quantity;
        const date = new Date(product.date);
        const dateString = date.toISOString().slice(0, 10);
        if (!stockInMap.has(dateString)) {
          stockInMap.set(dateString, 0);
        }
        stockInMap.set(
          dateString,
          stockInMap.get(dateString) + Math.abs(product.quantity)
        );
      });

      this.stockOut.forEach((product) => {
        this.datasets[2].value = product.totalPrice;
        const date = new Date(product.date);
        const dateString = date.toISOString().slice(0, 10);
        if (!stockOutPriceMap.has(dateString)) {
          stockOutPriceMap.set(dateString, { totalPrice: 0 });
        }
        stockOutPriceMap.get(dateString).totalPrice += Math.abs(product.totalPrice);
      });

      this.stockOut.forEach((product) => {
        this.datasets[1].value = product.quantity;
        const date = new Date(product.date);
        const dateString = date.toISOString().slice(0, 10);
        if (!stockOutMap.has(dateString)) {
          stockOutMap.set(dateString, { quantity: 0, totalPrice: 0 });
        }
        stockOutMap.get(dateString).quantity += Math.abs(product.quantity);
      });

      const labels = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.unshift(date.toISOString().slice(0, 10));
      }

      const datasets = [
        {
          label: "StockIn Quantity",
          borderColor: "#00D1B2",
          data: labels.map((dateString) => stockInMap.get(dateString) || 0),
          fill: false,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00D1B2",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00D1B2",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          tension: 0.5,
          cubicInterpolationMode: "default",
          hidden: !this.datasets[0].visible,
        },
        {
          label: "StockOut Quantity",
          borderColor: "#FF3860",
          data: labels.map((dateString) =>
            stockOutMap.has(dateString) ? stockOutMap.get(dateString).quantity : 0
          ),
          fill: false,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#FF3860",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#FF3860",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          tension: 0.5,
          cubicInterpolationMode: "default",
          hidden: !this.datasets[1].visible,
        },
        {
          label: "Total Price (Stock Out)",
          borderColor: "#209CEE",
          data: labels.map((dateString) =>
            stockOutPriceMap.has(dateString)
              ? stockOutPriceMap.get(dateString).totalPrice
              : 0
          ),
          fill: false,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#209CEE",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#209CEE",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          tension: 0.5,
          cubicInterpolationMode: "default",
          hidden: !this.datasets[2].visible,
        },
      ];

      return {
        labels,
        datasets,
      };
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
}
</style>
