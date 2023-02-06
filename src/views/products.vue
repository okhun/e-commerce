<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { useProducts } from "@/composables/useProducts";

const { products, isLoading, total, activePage, filter, handlePagination } =
  useProducts();
</script>

<template>
  <div class="min-h-[300px] mx-auto bg-white">
    <div class="flex justify-between items-center p-4">
      <p class="text-2xl">Total products {{ total }}</p>
      <div class="flex items-center gap-2">
        <p>Filter by Brand:</p>
        <input type="checkbox" class="w-5 h-5" v-model="filter" />
      </div>
    </div>

    <template v-if="!isLoading">
      <div
        v-if="products.length"
        class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
      >
        <template v-for="product in products" :key="product.id">
          <router-link
            :to="{ name: 'product_show', params: { id: product.id } }"
          >
            <ProductCard :product="product" />
          </router-link>
        </template>
      </div>
      <div v-else class="flex justify-center">
        <p>Products list are empty</p>
      </div>
      <div class="flex justify-end mt-10">
        <div class="flex gap-2">
          <button
            v-for="page in Math.ceil(total / 12)"
            class="w-10 h-10 border rounded flex justify-center items-center"
            :class="[
              page === activePage ? 'bg-blue-900 text-white' : 'bg-white',
            ]"
            @click="handlePagination(page)"
          >
            <p>{{ page }}</p>
          </button>
        </div>
      </div>
    </template>
    <div v-else class="flex justify-center">Loading...</div>
  </div>
</template>
