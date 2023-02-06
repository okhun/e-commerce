<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="flex relative">
    <div class="flex-auto flex flex-row min-h-screen max-w-full relative">
      <div class="w-full">
        <Header />
        <div class="mx-auto p-4 md:p-5 lg:p-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
