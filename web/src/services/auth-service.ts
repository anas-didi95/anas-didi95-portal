import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ISignInForm } from "../commons/types";
import { useAxios } from "./axios-service";

export const useAuthSignIn = () => {
  const axios = useAxios("/portal/signIn");
  const mutationKey = useMemo(() => ["useAuthSignIn"], []);
  const mutation = useMutation<unknown, Error, ISignInForm>({
    mutationKey,
    mutationFn: (reqBody) => {
      return axios.post("", reqBody);
    },
  });

  return mutation;
};

export const useAuthTest = () => {
  const axios = useAxios("/portal/api/auth/test");
  const mutationKey = useMemo(() => ["useAuthTest"], []);
  const mutation = useMutation<unknown, Error, void>({
    mutationKey,
    mutationFn: () => {
      return axios.post("");
    },
  });

  return mutation;
};
