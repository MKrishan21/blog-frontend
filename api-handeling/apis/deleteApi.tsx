import { Delete } from "../HttpServiceInstance";

export const deleteBlog = async (id: string) => {
  const res = await Delete(`/api/blogs/${id}`);
  return res;
};
