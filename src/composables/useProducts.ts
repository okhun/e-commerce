import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useProductStore } from "@/store/product";

export const useProducts = () => {
  const store = useProductStore();
  const { products, total, isLoading } = storeToRefs(store);
  const { getAllProducts } = store;

  const activePage = ref(1);
  const filter = ref(false);

  watch(filter, () => {
    fetchProducts(`products?limit=12&skip=${(activePage.value - 1) * 12}`);
  });

  onMounted(() => {
    fetchProducts(`products?limit=12`);
  });

  function fetchProducts(url: string) {
    let urlParams = url;

    if (filter.value) {
      urlParams += `&select=brand`;
    }

    getAllProducts(urlParams);
  }

  const handlePagination = (page: number) => {
    activePage.value = page;
    fetchProducts(`products?limit=12&skip=${(page - 1) * 12}`);
  };

  onUnmounted(() => store.$reset());

  return { products, isLoading, total, activePage, filter, handlePagination };
};
