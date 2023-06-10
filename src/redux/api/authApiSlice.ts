import { apiSlice } from "./apiSlice";

export type User = {
  username: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<User, LoginDto>({
      query: (credentials: LoginDto) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
