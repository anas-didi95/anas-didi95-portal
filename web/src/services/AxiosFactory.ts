import type { AxiosInstance } from "axios";
import axios, { AxiosError } from "axios";
import type { IErrorResponse } from "../commons/types";

interface IConf {
  contentType?: "json" | "form";
  useFormData?: boolean;
  timeout?: number;
  onUnauthorized?: () => void;
}

export const createAxiosInstance = (
  url: string,
  conf?: IConf,
): AxiosInstance => {
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
      if (!reqBody) return reqBody;

      if (contentType === "json") {
        return JSON.stringify(reqBody);
      }

      const data: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(reqBody)) {
        if (v) data[k] = v;
      }

      if (useFormData) {
        const formData = new FormData();
        for (const [k, v] of Object.entries(data)) {
          if (v instanceof FileList) {
            Array.from(v).forEach((file) => formData.append(k, file));
          } else {
            formData.append(k, v as string);
          }
        }
        formData.append("data", JSON.stringify(data));
        return formData;
      } else {
        const params = new URLSearchParams();
        params.append("data", JSON.stringify(data));
        return params;
      }
    },
  });

  let abortTimeout: number;

  instance.interceptors.request.use(
    (config) => {
      abortTimeout = window.setTimeout(() => abortController.abort(), timeout);
      return config;
    },
    (error) => Promise.reject(error as AxiosError),
  );

  instance.interceptors.response.use(
    (response) => {
      clearTimeout(abortTimeout);
      return response;
    },
    (error) => {
      clearTimeout(abortTimeout);
      const err = error as AxiosError;
      let isRetry = true;
      let message = err.response?.data as string;

      if (err.response?.status === 401) {
        isRetry = false;
        message = "Unauthorized!";
        if (conf?.onUnauthorized) {
          conf.onUnauthorized();
        }
      } else if (err.code === "ERR_CANCELED") {
        isRetry = false;
        message = "Connection Timeout!";
      }

      const res: IErrorResponse = { isRetry, message };
      return Promise.reject(Error(JSON.stringify(res)));
    },
  );

  return instance;
};
