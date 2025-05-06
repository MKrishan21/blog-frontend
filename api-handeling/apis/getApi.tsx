import { QueryFunctionContext } from "@tanstack/react-query";
import { get } from "../HttpServiceInstance";

export const getAllBlogs = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_key, { search, page, limit, sort, category }] = queryKey as [
    string,
    {
      search: string;
      page: number;
      limit: number;
      sort: string;
      category: string;
    }
  ];

  const res = await get(
    `/api/blogs?page=${page}&limit=${limit}&search=${search}&sort=${sort}&category=${category}`
  );
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
