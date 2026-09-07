import { api } from "./client";

export const authApi = {
  login: (email, password) => api.post("/client/loginClient", { email, password }, { auth: false }),

  register: ({ firstName, lastName, email, password }) =>
    api.post("/client/registerClient", { firstName, lastName, email, password }, { auth: false }),

  verifyEmailCode: (verificationCodeRequest) =>
    api.post("/client/registerClient/verifyCodeEmail", { verificationCodeRequest }, { auth: false }),

  logout: () => api.post("/logout", undefined, { auth: false }),
};

export default authApi;
