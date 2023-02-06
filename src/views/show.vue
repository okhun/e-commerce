<script setup lang="ts">
import BaseRating from "../components/BaseRating.vue";
import { useDetails } from "./../composables/useDetail";

const { product, photo, isLoading, handleImageClick } = useDetails();
</script>

<template>
  <div class="container mx-auto h-screen bg-white py-10 px-4">
    <div v-if="!isLoading" class="grid grid-cols-5 gap-4">
      <div class="col-span-5 md:col-span-2 flex gap-2">
        <div class="flex flex-col gap-2 min-w-[64px]">
          <img
            v-for="img in product.images"
            :src="img"
            class="w-16 h-16 border hover:shadow-lg"
            :alt="product.title"
            @click="handleImageClick(img)"
          />
        </div>
        <div><img :src="photo" class="w-full" alt="thumbnail" /></div>
      </div>
      <div class="col-span-5 md:col-span-3">
        <h3 class="text-2xl">{{ product.title }}</h3>
        <p class="my-2">{{ product.description }}</p>
        <div class="flex flex-col gap-2">
          <p>Brand: {{ product.brand }}</p>
          <p>Category: {{ product.category }}</p>
          <p>Price: {{ product.price }}$</p>
          <BaseRating v-if="product.rating" v-model="product.rating" disabled />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center"><p>Loading...</p></div>
  </div>
</template>
