import { defineStore } from "pinia";
import { getItem, setItem } from "@/utils/functions";

interface Comment {
  comment: string;
  rating: number;
  productId: string;
  userId: string;
  username: string;
  id: string;
}

export const useCommentStore = defineStore("comment", {
  state: () => ({
    isLoading: false,
    total: 0,
    comments: [] as Comment[],
  }),
  actions: {
    createComment(payload: any) {
      const comments = getItem("comments");
      if (comments) {
        const tempComment = JSON.parse(comments);
        tempComment.unshift(payload);
        setItem("comments", JSON.stringify(tempComment));
      } else {
        setItem("comments", JSON.stringify([payload]));
      }
    },
    getAllComments(id: string) {
      const comments = getItem("comments");
      if (comments) {
        const tempComment = JSON.parse(comments);
        const productComments = tempComment.filter(
          (comment: { productId: string }) => comment.productId === id
        );
        this.comments = productComments;
        this.total = productComments.length;
      } else {
        this.comments = [];
      }
    },
  },
});
