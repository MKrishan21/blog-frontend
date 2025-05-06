// hooks/useDeleteItem.js or similar

import { deleteBlog } from "@/api-handeling/apis/deleteApi";
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
