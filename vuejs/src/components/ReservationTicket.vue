<template>
  <div ref="printContent">
        <p><strong>Reference:</strong> {{ reservation.reference }}</p>

    <p><strong>Name:</strong> {{ reservation.firstName }} {{ reservation.lastName }}</p>
    <p><strong>Gender:</strong> {{ reservation.gender }}</p>
    <p><strong>Contact Number:</strong> {{ reservation.contactNumber }}</p>
    <p><strong>Booking Date:</strong> {{ reservation.bookingDate }}</p>

    <p><strong>Journey Date:</strong> {{ journeyDate }}</p>
    <p>
      <strong>Route:</strong> {{ route.source_city }} -
      {{ route.destination_city }}
    </p>
    <p><strong>Bus:</strong> {{ busType }}- {{ busNumber }}</p>
    <p>
      <strong>Seats:</strong>
      {{ selectedSeats.map((seat) => seat.seatNumber).join(", ") }}
    </p>
    <p><strong>Total Price:</strong> {{ $filters.currencyUSD(totalPrice) }}</p>

    <button
      @click="printPage"
      class="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
    >
      Print
    </button>

    </div>
</template>

<script>
export default {
  props: {
    reservation: Object,
    busNumber: String,
    route: String,
    journeyDate: Date,

    busType: String,
    selectedSeats: Array,
    totalPrice: Number,
    // Add more props as needed
  },

  methods: {
    printPage() {
      const content = this.$refs.printContent.innerHTML;
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <!-- Add any necessary stylesheets here -->
            <style>
              /* Add any necessary styles specific for printing */
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    },
  },
};
</script>

<style scoped>
/* Add styling as needed */
</style>
