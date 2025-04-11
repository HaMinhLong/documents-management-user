import { apiWrapper } from "@/store/apiWrapper";
import { TypeUser } from "./user";

const injectedRtkApi = apiWrapper.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: "/auth/login",
        method: "POST",
        body: queryArg,
      }),
    }),

    getMe: build.query<GetMeApiResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export type GetMeApiResponse = {
  data: { user?: TypeUser };
};

export type LoginApiResponse = {
  data: { accessToken?: string | null; permission?: string[]; user?: TypeUser };
};
export type LoginApiArg = {
  email: string;
  password: string;
};

export { injectedRtkApi as AuthApi };
export const { usePostLoginMutation, useGetMeQuery } = injectedRtkApi;
