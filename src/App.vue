<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = computed(() => {
  const metaLayout = route.meta.layout || "default";
  if (typeof metaLayout === "string") {
    return metaLayout.charAt(0).toUpperCase() + metaLayout.slice(1) + "Layout";
  } else {
    return "EmptyLayout";
  }
});
</script>

<template>
  <component :is="layout" />
</template>
