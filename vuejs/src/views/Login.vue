<template>
  <div class="w-full float-right">
    <Navgationbar />
  </div>
  <main
    class="loginbackground relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm">
      <Logo />

      <h1 class="sr-only">Log in to your Lomi account</h1>

      <form @submit="login">
        <div
          v-if="errorMsg"
          class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded"
        >
          {{ errorMsg }}
          <span
            @click="errorMsg = ''"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <input type="hidden" name="remember" value="true" />
        <div class="relative mt-5">
          <label for="email-address" class="sr-only">Email address</label>

          <div v-if="errors">
            <input
              x-ref="email"
              id="email-address"
              name="email"
              type="email"
              required
              v-model="user.email"
              class="text-gray-900 border-red-500 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
              placeholder="Email address"
            />
          </div>
          <div v-else>
            <input
              x-ref="email"
              id="email-address"
              name="email"
              type="email"
              required
              v-model="user.email"
              class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
              placeholder="Email address"
            />
          </div>
        </div>
        <div class="relative">
          <label for="password" class="sr-only">Password</label>

          <div v-if="errors">
            <input
              x-ref="password"
              id="password"
              name="password"
              type="password"
              required
              v-model="user.password"
              class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none border-red-500 rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-6 focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <div v-else>
            <input
              x-ref="password"
              id="password"
              name="password"
              type="password"
              required
              v-model="user.password"
              class="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-6 focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="relative">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="user.remember"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>
        <div class="mt-6">
          <button
            :disabled="loading"
            type="submit"
            class="w-full flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
            :class="{ 'cursor-not-allowed': loading, 'hover:bg-gray-700': loading }"
          >
            <svg
              v-if="loading"
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
            Sign in to account
          </button>
        </div>

        <p class="text-center">
          <router-link
            :to="{ name: 'reset' }"
            class="text-sm underline hover:text-gray-900"
            >Forgot password?</router-link
          >
        </p>

        <p class="mt-6">Don't have an account?</p>
        <router-link
          :to="{ name: 'register' }"
          class="rounded-md mt-6 border border-gray-300 hover:border-gray-400 py-2 px-10 font-medium flex items-center justify-center"
        >
          Get access
          <svg
            aria-hidden="true"
            width="11"
            height="10"
            fill="none"
            class="flex-none ml-1.5"
          >
            <path
              d="M5.977 9.639L10.616 5 5.977.362l-.895.89L8.19 4.353H.384v1.292H8.19L5.082 8.754l.895.885z"
              fill="currentColor"
            />
          </svg>
        </router-link>
      </form>
    </div>
  </main>
  <footer class="flex text-sm text-center py-4 px-4 sm:px-6 lg:px-8">
    <FooterBar />
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import Alert from "../components/Alert.vue";
import FooterBar from "@/components/FooterBar.vue";
import Logo from "@/components/Logo.vue";
import Navgationbar from "@/components/Navgationbar.vue";

const router = useRouter();
const user = {
  email: "",
  password: "",
  remember: false,
};

let errorMsg = ref("");
let loading = ref(false);

function login(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "dashboard",
      });
    })
    .catch(({ response }) => {
      loading.value = false;
      errorMsg.value = response.data.error;
    });
}
</script>

<style></style>
