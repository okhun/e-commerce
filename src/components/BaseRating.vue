<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    size?: "sm" | "md";
    disabled?: boolean;
  }>(),
  {
    size: "sm",
  }
);
const emit = defineEmits(["update:modelValue"]);

const ratingValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const hoverState = "transition-transform hover:scale-110";

const sizeVariant = computed(() => {
  switch (props.size) {
    case "sm":
      return {
        icon: "w-4 h-4 mx-px",
        selectedWrapper: "-top-1.5",
      };
    default:
      return {
        icon: "w-6 h-6 mx-0.5",
        selectedWrapper: "-top-0.5",
      };
  }
});

const disabledState = computed(() => {
  return props.disabled ? "pointer-events-none" : "cursor-pointer";
});

const percentVariant = computed(() => {
  if (ratingValue.value > 5) {
    return 100;
  } else if (ratingValue.value < 0) {
    return 0;
  } else {
    return (ratingValue.value * 100) / 5;
  }
});

const handleStarClick = (val: number) => {
  ratingValue.value = val;
};
</script>

<template>
  <div class="block">
    <span v-if="label" class="block text-base font-medium mb-1.5">{{
      label
    }}</span>
    <div class="relative inline-flex">
      <BaseIcon
        v-for="i in 5"
        :key="i + 'gray'"
        name="rating"
        class="inline-block text-gray-400 first:ml-0 last:mr-0"
        :class="[sizeVariant.icon, hoverState, disabledState]"
        viewBox="-1 0 22 20"
        v-on="!disabled ? { click: () => handleStarClick(i) } : {}"
      />
      <span
        class="absolute overflow-hidden whitespace-nowrap"
        :class="sizeVariant.selectedWrapper"
        :style="{ width: `${percentVariant}%` }"
      >
        <BaseIcon
          v-for="i in 5"
          :key="i + 'yellow'"
          data-test="star-yellow"
          name="rating"
          class="inline-block text-yellow-500 first:ml-0 last:mr-0"
          :class="[sizeVariant.icon, hoverState, disabledState]"
          viewBox="-1 0 22 20"
          v-on="!disabled ? { click: () => handleStarClick(i) } : {}"
        />
      </span>
    </div>
  </div>
</template>
