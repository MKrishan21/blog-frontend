import { useGetAllBlogs } from "./useGetAllBlogs";

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "color",
  "background",
];

export const getTopBlogs = async () => {
  const getTopBlog = await useGetAllBlogs();
  const topBlogs = getTopBlog?.data?.slice(0, 4);
  const randomIndex = Math.floor(Math.random() * topBlogs.length);
  return topBlogs[randomIndex];
};

export const paginationContent = async () => {
  const res = await useGetAllBlogs();
  const pagination = {
    total: res?.pagination?.total || 2,
    page: res?.pagination?.page || 1,
    limit: res?.pagination?.limit || 10,
    totalPages: res?.pagination?.totalPages || 1,
  };
  return pagination;
};
