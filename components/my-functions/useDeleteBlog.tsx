// hooks/useDeleteItem.js or similar

import { deleteBlog } from "@/api-handeling/apis/deleteApi";
import { editBlog } from "@/api-handeling/apis/postPutApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItem = (queryKeyToInvalidate: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] });
    },
    onError: () => {
      toast.error("Deletion failed");
    },
  });
};

export const useUpdateToggle = (queryKeyToInvalidate: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: string;
    }) => {
      const newStatus = !currentStatus;

      const formData = new FormData();
      formData.append("status", String(newStatus));

      // Reuse existing function
      return editBlog(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] });
    },
    onError: (error) => {
      console.error("Failed to toggle blog status:", error);
    },
  });
};
