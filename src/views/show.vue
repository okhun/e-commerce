<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseRating from "@/components/BaseRating.vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import { useDetails } from "@/composables/useDetail";

const {
  product,
  photo,
  isLoading,
  comment,
  rating,
  total,
  comments,
  isAuthenticated,
  handleImageClick,
  handleFormSubmit,
} = useDetails();
</script>

<template>
  <div class="container mx-auto min-h-screen bg-white py-10 px-4">
    <template v-if="!isLoading">
      <div class="grid grid-cols-5 gap-4">
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
            <BaseRating
              v-if="product.rating"
              v-model="product.rating"
              disabled
            />
          </div>
        </div>
      </div>
      <form
        v-if="isAuthenticated"
        class="mt-10 flex flex-col gap-6"
        @submit.prevent="handleFormSubmit"
      >
        <BaseTextArea
          class="w-full sm:w-96"
          v-model="comment.value.value"
          label="Leave a review"
          :success="comment.meta.valid && comment.meta.dirty"
          :error="!comment.meta.valid && !!comment.errorMessage.value"
          :message="comment.errorMessage.value"
        />
        <BaseRating v-model="rating.value.value" />
        <BaseButton class="w-40">Submit</BaseButton>
      </form>
      <div v-else class="mt-10">
        To leave a review, you need to
        <router-link :to="{ name: 'login' }" class="text-blue-500"
          >sign in</router-link
        >
      </div>
      <p class="my-10">Total reviews: {{ total }}</p>
      <div class="flex flex-col gap-4">
        <div
          v-for="comment in comments"
          class="bg-gray-100 p-4 rounded flex flex-col gap-4"
        >
          <div class="flex gap-2 items-center">
            <img
              src="./../assets/vue.svg"
              alt="logo"
              class="w-10 h-10 rounded-full"
            />
            <p>{{ comment.username }}</p>
          </div>
          <BaseRating :model-value="comment.rating" disabled />
          <p>
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </template>
    <div v-else class="flex justify-center"><p>Loading...</p></div>
  </div>
</template>
