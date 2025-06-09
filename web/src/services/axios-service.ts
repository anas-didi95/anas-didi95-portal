import { useNavigate } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import type { IErrorResponse } from "../commons/types";

interface IConf {
  contentType?: "json" | "form";
  useFormData?: boolean;
  timeout?: number;
}

export const useAxios = (url: string, conf?: IConf) => {
  const navigate = useNavigate();

  const contentType = conf?.contentType ?? "json";
  const useFormData = conf?.useFormData ?? false;
  const timeout = conf?.timeout ?? 15000;

  const abortController = new AbortController();
  const instance = axios.create({
    signal: abortController.signal,
    baseURL: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    transformRequest: (reqBody: unknown) => {
      if (!reqBody) {
        return reqBody;
      }

      if (contentType === "json") {
        return JSON.stringify(reqBody);
      }

      if (useFormData) {
        const formData = new FormData();
        const data: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(reqBody)) {
          if (!v) {
            continue;
          }
          if (v instanceof FileList) {
            for (const vv of v) {
              formData.append(k, vv);
            }
          } else {
            data[k] = v;
          }
        }
        formData.append("data", JSON.stringify(data));
        return formData;
      } else {
        const params = new URLSearchParams();
        const data: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(reqBody)) {
          if (v) {
            data[k] = v as unknown;
          }
        }
        params.append("data", JSON.stringify(data));
        return params;
      }
    },
  });

  let abortTimeout: number;
  instance.interceptors.request.use(
    (config) => {
      abortTimeout = setTimeout(() => abortController.abort(), timeout);
      return config;
    },
    (error) => {
      const err = error as AxiosError;
      console.error("Request Error!", err);
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      clearTimeout(abortTimeout);
      return response;
    },
    (error) => {
      clearTimeout(abortTimeout);
      const err = error as AxiosError;
      console.error("Response Error!", err);

      let isRetry = true;
      let message = err.response?.data as string;
      if (err.status === 401) {
        void navigate({ to: "/sign-in", replace: true });
      } else if (err.code === "ERR_CANCELED") {
        isRetry = false;
        message = "Connection Timeout";
      }

      const res: IErrorResponse = { isRetry, message };
      return Promise.reject(Error(JSON.stringify(res)));
    },
  );

  return instance;
};
