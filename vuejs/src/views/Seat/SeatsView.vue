<script>
import { mdiArrowExpandUp } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import axios from "@/axios.js";
import OverSpin from "@/components/OverSpin.vue";
import Alert from "@/components/Alert.vue";
import store from "@/store";

export default {
  components: {
    store,
    Alert,
    OverSpin,
    CardBoxModal,
    SectionMain,
    CardBox,
    LayoutAuthenticated,
    SectionTitleLineWithButton,
    BaseButton,
  },

  data() {
    return {
       seats: [],
      selectedBus: null,
      selectedRoute: null,
      selectedSeats: [],
      loading: false,
      load: false,
      routes: [],
      totalPrice: 0,
      commotion: 0,
      formData: {
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        contactNumber: "",
        email: "",
        bookingDate: "",
        journeyDate: "",
        status: false,
        paymentStatus: false,
        busId: "",
      },
      errors: {},
      errorMessage: "",
    };
  },
  mounted() {
    this.fetchBuses();
    this.fetchSeats();
    this.fetchRoutes();
  },

  computed: {
    bookedSeatCount() {
      return this.seats.filter((seat) => seat.availability === "booked").length;
    },
    availableSeatCount() {
      return this.seats.filter((seat) => seat.availability === "available").length;
    },
  },

  methods: {
    fetchBuses() {
      this.loading = true;
      axios
        .get(`/assign-seat/${this.$route.params.id}`)
        .then((response) => {
          this.seats = response.data.data.seat_questions;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;

          console.error("Error fetching buses:", error);
        });
    },
    fetchRoutes() {
      this.loading = true;
      axios
        .get("/routes")
        .then((response) => {
          this.routes = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;

          console.error("Error fetching buses:", error);
        });
    },
    fetchSeats() {
      this.loading = true;

      if (!this.selectedBus) return;
      axios
        .get(`/buses/${this.selectedBus}/seats`)
        .then((response) => {
          this.seats = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching seats:", error);
          this.loading = false;
        });
    },
    clearErrors() {
      setTimeout(() => {
        this.errors = {};
        this.errorMessage = "";
      }, 6000); // Adjust the duration as needed
    },
    assignSeats() {
      if (!this.selectedBus || !this.selectedSeats.length) return;

      // Set load to true to show loading state
      this.load = true;

      axios
        .post("/reservations", {
          seats: this.selectedSeats,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          gender: this.formData.gender,
          age: this.formData.age,
          contactNumber: this.formData.contactNumber,
          email: this.formData.email,
          bookingDate: this.formData.bookingDate,
          journeyDate: this.formData.journeyDate,
          status: this.formData.status,
          paymentStatus: this.formData.paymentStatus,
          route_id: this.selectedRoute,
          bus_id: this.selectedBus,
        })
        .then((response) => {
          console.log("Seats assigned successfully:", response.data);
          // Update seat availability after successful assignment
          this.selectedSeats.forEach((seatId) => {
            const index = this.seats.findIndex((seat) => seat.id === seatId);
            if (index !== -1) {
              this.seats[index].availability = "booked";
            }
          });
          this.$store.dispatch("getSeats");
          // Clear selected seats
          this.formData = [];
          this.selectedSeats = [];

          this.errors = {};
          this.errorMessage = "";
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            // If there are errors in the response, set them to the errors data property
            this.errors = error.response.data.errors;
            // Display the main error message if available
            this.errorMessage = error.response.data.message || "";

            // Call the method to clear errors after a specified duration
            this.clearErrors();
          } else {
            // If there are no errors in the response, set a generic error message
            this.errorMessage = "An error occurred.";
          }
        })
        .finally(() => {
          // Set load back to false after axios call finishes
          this.load = false;
        });
    },
  },
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" has-cancel> </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiArrowExpandUp" title="Product Report" main>
        <BaseButton
          target="_blank"
          :icon="mdiArrowExpandUp"
          label="Stock Out"
          color="contrast"
          rounded-full
          small
          @click="stockOut"
        />
        <BaseButton
          target="_blank"
          :icon="mdiArrowExpandUp"
          label="Stock In"
          color="contrast"
          rounded-full
          small
          @click="stockIn"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6 bg-gray-20 m-10" has-table>
        <pre>{{ seats.seat_questions }}</pre>
        <OverSpin v-if="loading" />
        <div class="m-10 mx-auto">
          <div v-if="errorMessage" class="bg-red-500 p-2 m-10 rounded-md">
            <div class="text-white">{{ errorMessage }}</div>
            <div v-for="(errorMessages, index) in errors" :key="index">
              <ul>
                <li
                  v-for="errorMessage in errorMessages"
                  :key="errorMessage"
                  class="text-white"
                >
                  {{ errorMessage }}
                </li>
              </ul>
            </div>
          </div>
          <form class="m-10" @submit.prevent="assignSeats">
            <div>
              <div class="mt-4 float-right">
                <p class="text-red-500">Booked Seats: {{ bookedSeatCount }}</p>
                <p class="text-green-500">Available Seats: {{ availableSeatCount }}</p>
              </div>
              <h2>Assign Seats to Passanger</h2>

              <div v-if="seats.length" class="mt-4">
                <h3 class="mb-2">Available Seats</h3>
                <ul class="flex flex-wrap gap-4">
                  <li
                    v-for="seat in seats"
                    :key="seat.id"
                    :class="{
                      'bg-red-500 dark:bg-red-500 dark:text-white':
                        seat.availability === 'booked',
                      'bg-green-500  ': seat.availability === 'available', // Removed extra space after 'bg-green-500'
                    }"
                    class="flex items-center justify-center p-4 dark:bg-gray-800 border border-gray-300 rounded-md"
                  >
                    <label class="flex items-center dark:text-white text-gray-800">
                      <span>Seat {{ seat.seatNumber }}</span>
                    </label>
                    <span v-if="seat.availability === 'booked'" class="ml-1">Booked</span>
                    <!-- Display 'Booked' if seat is booked -->
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
