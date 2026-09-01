import { api } from "./client";

export const salesApi = {
  create: (orderId, deliveryAddress) =>
    api.post(
      "/sales",
      { order_id: orderId, delivery_address: deliveryAddress, payment_method: "Tarjeta de Crédito/Débito" },
      { auth: false },
    ),
};

export default salesApi;
