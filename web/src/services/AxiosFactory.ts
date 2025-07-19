import type { AxiosInstance } from "axios";
import axios, { AxiosError } from "axios";
import type { IErrorResponse } from "../commons/types";

interface IConf {
  contentType?: "json" | "form";
  useFormData?: boolean;
  onUnauthorized?: () => void;
}

export const createAxiosInstance = (
  url: string,
  conf?: IConf,
): AxiosInstance => {
  const contentType = conf?.contentType ?? "json";
  const useFormData = conf?.useFormData ?? false;

  const headerContentType =
    contentType === "json"
      ? "application/json"
      : useFormData
        ? "multipart/form-data"
        : "application/x-www-form-urlencoded";

  const instance = axios.create({
    baseURL: url,
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": headerContentType,
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

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const err = error as AxiosError;
      let isRetry = true;
      let message = getErrorMessage(err);

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

function getErrorMessage(err: AxiosError): string {
  if (typeof err.response?.data === "string") return err.response.data;
  console.error("[getErrorMessage] err.response.data", err.response?.data);
  return "Unknown Server Error!";
}
