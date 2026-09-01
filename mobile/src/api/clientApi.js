import { api } from "./client";

export const clientApi = {
  // No existe GET /api/client/:id en el backend, así que se trae la lista
  // completa y se filtra por id (misma limitación que tiene la web).
  getById: async (id) => {
    const clients = await api.get("/client");
    return (clients?.client || []).find((c) => c._id === id) || null;
  },

  update: (id, data) => api.put(`/client/${id}`, data),

  remove: (id) => api.delete(`/client/${id}`),
};

export default clientApi;
