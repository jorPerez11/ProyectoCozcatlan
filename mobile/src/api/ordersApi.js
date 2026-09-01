import { api } from "./client";

export const ordersApi = {
  create: (clientId, products) =>
    api.post("/orders", { client_id: clientId, products }, { auth: false }),

  getByClient: (clientId) => api.get(`/orders/client/${clientId}`, { auth: false }),
};

export default ordersApi;
