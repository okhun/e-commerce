<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "./../store/auth";
import BaseButton from "./BaseButton.vue";

const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const { logout } = store;
</script>

<template>
  <div class="sticky top-0 z-header bg-white">
    <div
      class="flex justify-between items-center border-b border-dark-lighter p-3 md:p-4 lg:px-6"
    >
      <div class="flex items-center gap-4">
        <router-link :to="{ name: 'home' }" class="text-lg font-bold"
          >E-Commerce</router-link
        >
      </div>
      <div class="flex items-center gap-3 md:gap-4 xl:gap-8">
        <template v-if="!isAuthenticated">
          <router-link :to="{ name: 'login' }">Login</router-link>
          <router-link :to="{ name: 'register' }">Register</router-link>
        </template>
        <template v-else>
          <BaseButton class="px-4" @click="logout">Logout</BaseButton>
        </template>
      </div>
    </div>
  </div>
</template>
