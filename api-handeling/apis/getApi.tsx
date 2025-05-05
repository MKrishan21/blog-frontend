import { get } from "../HttpServiceInstance";

export const getAllBlogs = async () => {
  const res = await get("/api/blogs");
  return res;
};

export const getBlogById = async (id: string) => {
  try {
    const res = await get(`/api/blogs/${id}`);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await get(`/api/auth/get-user/${id}`);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getUserBlogs = async (id: string) => {
  try {
    const res = await get(`/api/blogs/user-blogs/${id}`);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
