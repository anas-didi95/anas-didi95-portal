import type { AxiosInstance } from "axios";
import type { ISignInForm } from "../commons/types";

export interface IAuthService {
  signIn(data: ISignInForm, signal: AbortSignal): Promise<unknown>;
}

export class AuthService implements IAuthService {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signIn(data: ISignInForm, signal: AbortSignal): Promise<unknown> {
    const res = await this.axios.post("", data, { signal });
    return res.data;
  }
}
