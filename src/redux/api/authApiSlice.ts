import { history } from "../../helpers/history";
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

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // navigate to login page once logout succeeded
          history.navigate?.("/login", { replace: true });
        } catch (e) {
          console.log("failed to logout", e);
        } finally {
          // reset redux states
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
