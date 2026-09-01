import { api } from "./client";

export const reviewsApi = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`, { auth: false }),

  save: (productId, clientId, rating, comment) =>
    api.post("/reviews", { product_id: productId, client_id: clientId, rating, comment }, { auth: false }),

  remove: (reviewId) => api.delete(`/reviews/${reviewId}`, { auth: false }),
};

export default reviewsApi;
