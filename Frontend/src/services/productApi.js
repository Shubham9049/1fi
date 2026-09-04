const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;
export const getProducts = async ({ signal } = {}) => {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/slug/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};
