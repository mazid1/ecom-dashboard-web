import { LoginDto } from "../../components/auth/LoginForm";
import { RegisterDto } from "../../components/auth/RegisterForm";
import { history } from "../../helpers/history";
import { User } from "./@types";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "./userApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<User, RegisterDto>({
      query: (userInfo: RegisterDto) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          await dispatch(
            authApiSlice.endpoints.login.initiate({
              username: args.username,
              password: args.password,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

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
          // navigate to target page once login succeeded
          history.navigate?.(history.location ?? "/", { replace: true });
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

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
