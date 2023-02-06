<script setup lang="ts">
import BaseRating from "@/components/BaseRating.vue";

defineProps<{
  product: {
    brand: string;
    category?: string;
    description?: string;
    discountedPrice?: number;
    id?: number;
    images?: string[];
    price?: number;
    rating?: number;
    stock?: number;
    thumbnail?: string;
    title?: string;
  };
}>();
</script>

<template>
  <div
    class="border bg-white hover:shadow-lg hover:scale-105 duration-200 rounded"
  >
    <img
      v-if="product.thumbnail"
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full max-h-80"
    />
    <div class="p-4">
      <p>Brand: {{ product.brand }}</p>
      <p>{{ product?.description }}</p>
      <div>
        <BaseRating
          v-if="product.rating"
          :model-value="product.rating"
          disabled
        />
      </div>
    </div>
  </div>
</template>
