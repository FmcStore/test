const BASE_URL = "https://www.sankavollerei.com/comic/bacakomik";

export const api = {
  search: async (query) => {
    const res = await fetch(`${BASE_URL}/search/${encodeURIComponent(query)}`);
    return (await res.json()).komikList || [];
  },

  latest: async (page = 1) => {
    const res = await fetch(`${BASE_URL}/latest?page=${page}`);
    const data = await res.json();
    return { list: data.komikList || [], hasNext: data.hasNextPage };
  },

  detail: async (slug) => {
    const res = await fetch(`${BASE_URL}/detail/${slug}`);
    return (await res.json()).detail;
  },

  chapter: async (slug) => {
    const res = await fetch(`${BASE_URL}/chapter/${slug}`);
    return await res.json();
  }
};
