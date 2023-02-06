import { defineStore } from "pinia";
import { useGet } from "@/api/fetch";

interface Product {
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
}

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    product: {} as Product,
    isLoading: false,
    total: 0,
  }),
  actions: {
    getAllProducts(url: string) {
      this.isLoading = true;
      useGet(url)
        .then((data) => {
          this.products = data.products;
          this.total = data.total;
        })
        .finally(() => (this.isLoading = false));
    },
    getProduct(url: string) {
      this.isLoading = true;
      useGet(url)
        .then((data) => {
          this.product = data;
        })
        .finally(() => (this.isLoading = false));
    },
  },
});
