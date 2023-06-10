import { LoginDto, User } from "./@types";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "./userApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<User, LoginDto>({
      query: (credentials: LoginDto) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          await dispatch(userApiSlice.endpoints.getMe.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
