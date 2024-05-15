<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const data = [
        {
          id: 10,
          user_id: 2,
          category_id: 1,
          productName: "Dashn",
          barCode: "497037994",
          image: null,
          purchasePrice: "30",
          salesPrice: "40",
          quantity: "21",
          code: null,
          size: null,
          color: null,
          brand: null,
          status: 1,
          created_at: "2024-03-16T11:27:05.000000Z",
          updated_at: "2024-03-17T06:38:50.000000Z",
          category: {
            id: 1,
            user_id: 2,
            category: "Alcohol",
            created_at: "2024-03-16T11:25:55.000000Z",
            updated_at: "2024-03-16T11:25:55.000000Z",
          },
          stock_out: [
            {
              id: 43,
              productName: "Dashn",
              barCode: "497037994",
              purchasePrice: "30",
              salesPrice: "40",
              remaining: "24",
              previous: "25",
              quantity: "-1",
              profit: "10",
              Transaction: "Stock Out",
              totalStockOutPrice: "40",
              user_id: 2,
              details_id: 15,
              survey_id: 10,
              created_at: "2024-03-16T18:12:40.000000Z",
              updated_at: "2024-03-16T18:12:40.000000Z",
            },
            {
              id: 32,
              productName: "Dashn",
              barCode: "497037994",
              purchasePrice: "30",
              salesPrice: "40",
              remaining: "25",
              previous: "27",
              quantity: "-2",
              profit: "20",
              Transaction: "Stock Out",
              totalStockOutPrice: "80",
              user_id: 2,
              details_id: 13,
              survey_id: 10,
              created_at: "2024-03-15T13:37:15.000000Z",
              updated_at: "2024-03-16T13:37:15.000000Z",
            },
          ],
        },
        // Add more data objects as needed
      ];

      const ctx = document.getElementById("myChart").getContext("2d");

      const { labels, points } = this.extractChartData(data);

      new Chart(ctx, {
        type: "scatter",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Stock Out",
              data: points,
              backgroundColor: this.generateRandomColor(),
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Stock Out Quantity",
              },
            },
            x: {
              title: {
                display: true,
                text: "Product Name",
              },
            },
          },
        },
      });
    },
    extractChartData(data) {
      const labels = [];
      const points = [];
      data.forEach((item) => {
        labels.push(item.productName);
        points.push(item.stock_out.length);
      });
      return { labels, points };
    },
    generateRandomColor() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    },
  },
};
</script>

<style>
/* Add styles if needed */
</style>
