<script>
import { mdiArrowExpandUp } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import axios from "../axios.js";
import OverSpin from "@/components/OverSpin.vue";
import Alert from "@/components/Alert.vue";
import store from "../store";
import { setMapStoreSuffix } from "pinia";
import Modal from "@/components/Modal.vue";
import ReservationTicket from "@/components/ReservationTicket.vue";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    Modal,
    ReservationTicket,
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
      isVisibleSeat:false,
            isVisible:false,

      reservation:{},
      route: {},
      buses: [],
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
        bookingDate: new Date().toISOString().substr(0, 10),
        journeyDate: " ",
        status: false,
        paymentStatus: false,
        reference: " ",
      },
       errors: {},
      errorMessage: "",
       selectedRouteId: null,
      selectedDate: null,
      busId: "",
     };
  },

  computed: {
    bookedSeatCount() {
    if (!this.reservation || !this.reservation.seat_questions) return 0; // Return 0 if reservation or seat_questions are undefined or null
    return this.reservation.seat_questions.filter(seat => seat.availability === 'booked').length;
  },
  availableSeatCount() {
    if (!this.reservation || !this.reservation.seat_questions) return 0; // Return 0 if reservation or seat_questions are undefined or null
    return this.reservation.seat_questions.filter(seat => seat.availability === 'available').length;
  },

    // Find the selected bus object from the buses array
    selectedBusInfo() {
      return this.buses.find((bus) => bus.id === this.selectedBus);
    },
    // Extract busNumber from the selectedBusInfo
    busNumber() {
      return this.selectedBusInfo ? this.selectedBusInfo.busNumber : null;
    },
    // Extract bus type from the selectedBusInfo
    busType() {
      return this.selectedBusInfo ? this.selectedBusInfo.type : null;
    },

    totalPrice() {
      if (this.selectedSeats.length && this.reservation) {
        return this.selectedSeats.length * this.reservation.route.price;
      }
      return 0;
    },
  },
  mounted() {
    //this.fetchBuses();
    this.fetchRoutes();
    // this.fetchSeats();

    // Fetch seats for the initial journey date
    //this.fetchSeatsByDate(this.formData.journeyDate);
  },

  watch: {
    assignSeats: {
    handler(newValue, oldValue) {
      // Check if selectedSeats array has changed
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        // Fetch seats
        this.fetchSeats();
        this.reserveBook();


      }
    },
    deep: true // Watch for nested changes in selectedSeats array
  },
  reservation: {
    handler(newVal) {
      // Recompute counts when reservation data changes
      this.$nextTick(() => {
        this.bookedSeatCount;
        this.availableSeatCount;
      });
    },
    deep: true // Deep watch for nested properties
  }
},

  methods: {
    clearReservationData() {
    this.formData = {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      contactNumber: "",

      status: false,
      paymentStatus: false,
    };
    this.selectedSeats = [];
    //this.isVisibleSeat = false;
  },

    reserveBook(bus){
      this.isVisibleSeat = !this.isVisibleSeat;
      this.reservation = bus;

    },

     findSeatsByRouteAndDate() {
      // Make sure both route and date are selected
      if (!this.selectedRouteId || !this.selectedDate) return;

      // Send a GET request to your backend API to fetch routes by date and route ID
      axios
        .get(`/seats-route?route_id=${this.selectedRouteId}&date=${this.selectedDate}`)
        .then((response) => {
          // Assuming the response contains an array of routes for the specified date and route ID
          this.routes = response.data.routes;

          // Fetch seats based on the selected route and date
          this.fetchSeats();
          this.fetchRoutes();
         })
        .catch((error) => {
          console.error("Error fetching routes:", error);
        });
    },
    fetchSeats() {
      // Send a GET request to fetch seats based on the selected route and date
      axios
        .get(`/seats-route?route_id=${this.selectedRouteId}&date=${this.selectedDate}`)
        .then((response) => {
          //this.seats = response.data.seats;
          this.seats = response.data;
          this.fetchRoutes();

         })
        .catch((error) => {
          console.error("Error fetching seats:", error);
        });
    },


    modelReservation() {
      this.isVisible = !this.isVisible;
      // Call the method to close reservation print
     // this.closeReservationPrint();
    },

    closeReservationPrint() {
      this.isVisibleSeat = false;
      // Clear any other necessary data related to reservation print
    },
    isSelected(seat) {
      // Check if the seat object is included in selectedSeats array
      return this.selectedSeats.some((selectedSeat) => selectedSeat.seat_id === seat.id);
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
    // fetchSeats() {
    //   this.loading = true;
    //   if (!this.selectedBus) return;
    //   axios
    //     .get(`/buses/${this.selectedBus}/seats`)
    //     .then((response) => {
    //       this.seats = response.data.seat_questions;
    //       this.route = response.data.route;
    //       // this.isVisible = true;

    //       this.loading = false;
    //     })
    //     .catch((error) => {
    //       this.loading = false;

    //       console.error("Error fetching seats:", error);
    //     });
    // },
    clearErrors() {
      setTimeout(() => {
        this.errors = {};
        this.errorMessage = "";

      }, 6000); // Adjust the duration as needed
    },
    // fetchSeatsByDate(date) {
    //   this.loading = true;
    //   axios
    //     .get(`/seats?date=${date}`)
    //     .then((response) => {
    //       this.seats = response.data.seat_questions;
    //       this.route = response.data.route;
    //       this.loading = false;
    //     })
    //     .catch((error) => {
    //       this.loading = false;
    //       console.error("Error fetching seats:", error);
    //     });
    // },
    // clearErrors() {
    //   setTimeout(() => {
    //     this.errors = {};
    //     this.errorMessage = "";
    //   }, 6000); // Adjust the duration as needed
    // },
    assignSeats() {
      //if (!this.selectedBus || !this.selectedSeats.length) return;
       let ref = "REF" + Math.random().toString(36).toUpperCase().slice(2);
       this.formData.reference = ref;
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
          bookingDate: this.formData.bookingDate,
          journeyDate: this.reservation.journeyDate,
          status: this.formData.status,
          paymentStatus: this.formData.paymentStatus,
          route_id: this.reservation.route_id,
          bus_id: this.reservation.bus_id,
          price: this.$refs.price.value,
          reference: this.formData.reference,
seat_id:this.reservation.id
        })
        .then((response) => {
          store.commit("notify", {
            type: "success",
            message: response.data.message,
          });


// Update reservation data to reflect booked seats
this.reservation.seat_questions.forEach(seat => {
        if (this.selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.id)) {
          seat.availability = 'booked';
        }
      });
          // console.log(response);
          this.loading = false;

          // Clear selected seats
          //this.formData = [];
          //this.selectedSeats = [];
          this.isVisible = true;
          this.isVisibleSeat = true;

          // Fetch seats again to update the seat availability
          this.fetchSeats();
          //this.reserveBook();


          this.errors = {};
          this.errorMessage = "";
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            // If there are errors in the response, set them to the errors data property
            this.errors = error.response.data.errors;
            // Display the main error message if available
            this.errorMessage = error.response.data.message || "";
            this.loading = false;

            // Call the method to clear errors after a specified duration
            this.clearErrors();
          } else {
            // If there are no errors in the response, set a generic error message
            this.errorMessage = "An error occurred.";
            this.loading = false;
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
         <OverSpin v-if="loading" />
         <div class="m-10 mx-auto">


            <div>
              <h2 class="ml-4">Assign Seats to Passenger</h2>
              <div class="flex flex-wrap">
                <div class="   gap-4">
                  <!-- Date selection -->
                  <label class="ml-4" for="date">Select Date:</label>
                  <input                     class="p-2 ml-2 mt-4 border border-gray-300 dark:bg-gray-800 rounded-md w-[200px]"
                  type="date" v-model="selectedDate" />

                  <!-- Route selection -->
                  <label  class="ml-4" for="route">Select Route:</label>
                  <select
                    v-model="selectedRouteId"
                    @change="fetchSeatsByRoute"
                    class="p-2 ml-2 mt-4 border border-gray-300 dark:bg-gray-800 rounded-md w-[200px]"
                  >
                    <option value="">Select Route</option>
                    <!-- Iterate over routes to populate options -->
                    <option v-for="route in routes" :key="route.id" :value="route.id">
                      {{ route.source_city }} -{{ route.destination_city }}
                    </option>
                  </select>

                  <!-- Find button -->

                  <button @click="findSeatsByRouteAndDate"
                  :disabled="load"
                  type="button"
                  class="mt-4 px-4 py-2 ml-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  :class="{
                    'cursor-not-allowed': load,
                    'hover:bg-gray-700': load,
                  }"
                >
                  <svg
                    v-if="load"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span v-if="!load">Find Seats</span>
                </button>
                  <!-- Display fetched seats -->
                </div>
              </div>
              <div v-if="seats && seats.length" class="mt-4">
                <h3 class="ml-4">Available Seats</h3>

                <div class="mx-auto w-full mt-10">
                  <div class="flex flex-wrap justify-center ">

                    <!-- Seats for each bus -->
                    <div v-for="(bus, index) in seats" :key="index" class="mx-4 mb-6 cursor-pointer" @click="reserveBook(bus)">
                      <div class="bg-gray-50 p-4  dark:bg-gray-800 hover:dark:bg-gray-700  rounded-lg shadow hover:bg-gray-200">
                        <div class="flex flex-wrap gap-4">
                          <div><strong>Bus</strong> {{ index + 1 }}</div>
                          <p class="text-center text-lg font-semibold mb-2">
                            Bus Number: {{ bus.bus.busNumber }}
                          </p>
                          <p class="text-center text-lg font-semibold mb-2">
                            Bus Type: {{ bus.bus.type }}
                          </p>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div v-else class="mt-4">
                <p class="text-red-500 ml-4">No available seats.</p>
              </div>

            </div>

        </div>
        <!-- Reservation Ticket Modal -->
        <div class="fixed mt-10 inset-0 overflow-y-auto h-auto " v-if="isVisibleSeat">
          <div class="flex m-10  rounded-md  items-center justify-center min-h-screen">
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              @click="close"
            ></div>
            <div
              class="bg-white dark:bg-gray-700 dark:text-gray-300 rounded-lg overflow-hidden shadow-xl relative z-10   w-full p-6"
            >
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold mb-4">Reservation Ticket</h2>
                <button
                  @click="reserveBook"
                  class="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <form class="m-10" @submit.prevent="assignSeats">
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
<Notification/>
                <div>
                <div class=" mx-auto text-sm   dark:bg-gray-800 text-gray-700 dark:text-gray-200   rounded-lg overflow-hidden p-4 mb-4">
                  <div>
                    <h2 class=" first-letter:0 font-bold text-xl">Route: {{ reservation.route.source_city }} to {{ reservation.route.destination_city }}</h2>
                    <p class="mt-2  text-sm">Journey Date: {{ reservation.journeyDate }}</p>
                  </div>
                  <div class="mt-2">
                    <p class=" ">Bus Number: {{ reservation.bus.type }} - {{ reservation.bus.busNumber }}</p>
                    <p class=" ">{{ reservation.bus.capacity }} seats</p>
                  </div>
                  <div class="mt-2">
                    <p class=" ">Departure: {{ reservation.route.departure_time }}</p>
                    <p class=" ">Arrival: {{ reservation.route.arrival_time }}</p>
                  </div>
                  <div class="mt-2">
                    <p class=" ">Price: {{ reservation.route.price }}</p>
                    <!-- You can add more details here if needed -->
                  </div>
                  <div v-if="seats && seats.length" class="flex-grow mt-4">
                    <label for="bus">Total Price</label>
                    <button
                      class="bg-gray-50 border w-auto border-gray-50 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      {{ $filters.currencyUSD(totalPrice) }}
                    </button>
                    <input ref="price" type="hidden" :value="totalPrice" name="" id="" />
                  </div>
                  <div class="mt-4 float-right">
                    <p class="text-red-500">Booked Seats: {{ bookedSeatCount }}</p>
                    <p class="text-green-500">Available Seats: {{ availableSeatCount }}</p>
                  </div>


                  <!-- Add more sections or details as needed -->
                </div>

                <div class="mb-4 flex flex-wrap gap-5">
                  <div class="mb-4 flex-grow">
                    <label
                      class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                      for="firstName"
                    >
                      First Name
                    </label>
                    <input
                      v-model="formData.firstName"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="lastName">
                      Last Name
                    </label>
                    <input
                      v-model="formData.lastName"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>

                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="gender"> Gender </label>
                    <select
                      v-model="formData.gender"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="age"> Age </label>
                    <input
                      v-model="formData.age"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="age"
                      type="number"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div class="mb-4 flex flex-wrap gap-5">
                  <div class="mb-4 flex-grow">
                    <label
                      class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                      for="contactNumber"
                    >
                      Contact Number
                    </label>
                    <input
                      v-model="formData.contactNumber"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="contactNumber"
                      type="contactNumber"
                      placeholder="contactNumber"
                    />
                  </div>

                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="lastName">
                      Booking Date
                    </label>
                    <input
                      v-model="formData.bookingDate"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="bookingDate"
                      type="date"
                      placeholder="bookingDate"
                    />
                  </div>

                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="age">
                      Journey Date
                    </label>
                    <input
                      :value="this.reservation.journeyDate"
                      class="shadow appearance-none border rounded w-full py-2 px-3 dark:bg-gray-800 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="journeyDate"
                      type="date"
                      placeholder="journeyDate"
                    />
                  </div>
                  <div class="mb-4 flex-grow">
                    <label class="block text-sm font-bold mb-2" for="status"> Status </label>
                    <input v-model="formData.status" id="status" type="checkbox" />
                  </div>
                </div>

  <!-- Loop through each seat and display -->
  <ul class="flex flex-wrap gap-4">

    <li
      v-for="seat in reservation.seat_questions"
      :key="seat.id"
      :class="{
        'bg-red-500 dark:bg-red-500 text-white':
          seat.availability === 'booked',
        'hover:bg-green-500 dark:hover:bg-green-500 ': seat.availability != 'booked',
      }"
      class="flex items-center justify-center px-4 py-1 text-sm dark:bg-gray-800  border border-gray-300 rounded-md"
    >
      <label class="flex items-center">
        <input
          type="checkbox"
          :value="{
            seat_id: seat.id,
            seatNumber: seat.seatNumber,
          }"
          v-model="selectedSeats"
          class="mr-2"
          :disabled="seat.availability === 'booked'"
          :checked="isSelected(seat)"
        />
        <span>Seat {{ seat.seatNumber }}</span>
      </label>
      <span v-if="seat.availability === 'booked'" class="ml-1"
        >Booked</span
      >
      <!-- Display 'Booked' if seat is booked -->
    </li>
    <button
      :disabled="load"
      type="submit"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      :class="{
        'cursor-not-allowed': load,
        'hover:bg-gray-700': load,
      }"
    >
      <svg
        v-if="load"
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span v-if="!load">Assign Seats</span>
    </button>
  </ul>
              </div>

            </form>
            <div class="mt-6 flex justify-end">
              <button
                @click="reserveBook"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none"
              >
                Close
              </button>
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Save
              </button>
            </div>
            </div>
          </div>

        </div>
           <!-- Reservation Ticket Modal -->
           <div class="fixed inset-0 overflow-y-auto" v-if="isVisible">
            <div class="flex items-center justify-center min-h-screen">
              <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                @click="modelReservation(); clearReservationData()"
                ></div>
              <div
                class="bg-white dark:bg-gray-700 dark:text-gray-300 rounded-lg overflow-hidden shadow-xl relative z-10 max-w-lg w-full p-6"
              >
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-bold mb-4">Reservation Ticket</h2>
                  <button
                  @click="modelReservation(); clearReservationData()"
                  class="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <!-- Modal content goes here -->
                  <ReservationTicket
                  :reservation="formData"
                  :busNumber="reservation.bus.busNumber "
                  :busType="reservation.bus.type "
                  :selectedSeats="selectedSeats"
                  :totalPrice="totalPrice"
                  :route="reservation.route"
                  :journeyDate="this.reservation.journeyDate"
                  />
                </div>
                <div class="mt-6 flex justify-end">
                  <button
                  @click="modelReservation(); clearReservationData()"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                  >
                    Close
                  </button>
                  <button
                  @click="modelReservation(); clearReservationData()"

                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
