export async function useGetAllBlogs({
  search = "",
  sort = "desc",
  limit = 10,
  category = "",
  page = 1,
} = {}) {
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/blogs?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store", // disables caching for fresh SSR data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return await res.json();
}
