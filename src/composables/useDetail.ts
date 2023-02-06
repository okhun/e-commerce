import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import { type InferType, object, string, number } from "yup";
import { useProductStore } from "@/store/product";
import { useAuthStore } from "@/store/auth";
import { useCommentStore } from "@/store/comments";
import { createUUID } from "@/utils/functions";

export const useDetails = () => {
  const store = useProductStore();
  const authStore = useAuthStore();
  const commentStore = useCommentStore();

  const { product, isLoading } = storeToRefs(store);
  const { getProduct } = store;
  const { user } = authStore;
  const { createComment, getAllComments } = commentStore;
  const { total, comments } = storeToRefs(commentStore);
  const { isAuthenticated } = storeToRefs(authStore);
  const route = useRoute();
  const { id } = route.params;
  const photo = ref("");

  const errorMessage = "Field is requied";

  const formSchema = object({
    comment: string().required(errorMessage),
    rating: number().required(errorMessage),
  });
  type FormType = InferType<typeof formSchema>;

  const { handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: { comment: "", rating: 1 },
  });

  const comment = useField<FormType["comment"]>("comment");
  const rating = useField<FormType["rating"]>("rating");

  watch(product, (newValue) => {
    if (newValue?.thumbnail) {
      photo.value = newValue.thumbnail;
    }
  });

  const handleFormSubmit = handleSubmit((values) => {
    const form = {
      comment: values.comment,
      rating: values.rating,
      productId: id,
      userId: user.id,
      username: user.username,
      id: createUUID(),
    };
    createComment(form);
    resetForm();
    getAllComments(id.toString());
  });

  onMounted(() => {
    getProduct(`products/${id}`);
    getAllComments(id.toString());
  });

  onUnmounted(() => store.$reset());

  const handleImageClick = (url: string) => {
    photo.value = url;
  };

  return {
    product,
    isLoading,
    photo,
    comment,
    rating,
    total,
    comments,
    isAuthenticated,
    handleImageClick,
    handleFormSubmit,
  };
};
