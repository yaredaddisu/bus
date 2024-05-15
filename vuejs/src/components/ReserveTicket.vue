<template>
  <div ref="printContent">
        <p><strong>Reference:</strong> {{ reservation.reference }}</p>

    <p><strong>Name:</strong> {{ reservation.firstName }} {{ reservation.lastName }}</p>
    <p><strong>Gender:</strong> {{ reservation.gender }}</p>
    <p><strong>Contact Number:</strong> {{ reservation.contactNumber }}</p>
    <p><strong> Booking Date :</strong> {{ reservation.bookingDate }}</p>
    <p><strong>Journey Date:</strong> {{ reservation.journeyDate }}</p>
    <p>
      <strong>Route:</strong> {{ reservation.route.source_city }} -
      {{ reservation.route.destination_city }}
    </p>

    <p>
      <strong>Bus:</strong> {{ reservation.bus.type }} - {{ reservation.bus.busNumber }}
    </p>

    <p>
      <strong>Seats:</strong>
      {{ reservation.seat.map((seat) => seat.seatNumber).join(", ") }}
    </p>
    <p><strong>Total Price:</strong> {{ $filters.currencyUSD(reservation.price) }}</p>
    <!-- Add more ticket details as needed -->

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
              .body {
                margin: 10px;
              }
            </style>
          </head>
          <body class="body">
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
