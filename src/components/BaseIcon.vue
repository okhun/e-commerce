<script setup lang="ts">
import icons from "@/utils/icons";
const props = defineProps<{
  name: keyof typeof icons;
  viewBox?: string;
}>();
</script>

<template>
  <svg
    :class="$attrs.class || 'w-6 h-6'"
    :viewBox="viewBox || '0 0 24 24'"
    :fill="name.includes('Outline') ? 'none' : 'currentColor'"
    :stroke="name.includes('Outline') ? 'currentColor' : 'none'"
    xmlns="http://www.w3.org/2000/svg"
    v-html="icons[props.name]"
  ></svg>
</template>
