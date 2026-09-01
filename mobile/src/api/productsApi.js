import { api } from "./client";

export const productsApi = {
  getAll: () => api.get("/products", { auth: false }),
  getById: (id) => api.get(`/products/${id}`, { auth: false }),
};

export default productsApi;
