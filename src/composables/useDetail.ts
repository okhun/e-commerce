import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "./../store/product";

export const useDetails = () => {
  const store = useProductStore();
  const { getProduct } = store;
  const { product, isLoading } = storeToRefs(store);
  const route = useRoute();
  const { id } = route.params;
  const photo = ref("");

  watch(product, (newValue) => {
    if (newValue?.thumbnail) {
      photo.value = newValue.thumbnail;
    }
  });

  onMounted(() => {
    getProduct(`products/${id}`);
  });

  onUnmounted(() => store.$reset());

  const handleImageClick = (url: string) => {
    photo.value = url;
  };

  return { product, isLoading, photo, handleImageClick };
};
