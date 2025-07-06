// services/AuthService.ts
import type { AxiosInstance } from "axios";
import type { ISignInForm } from "../commons/types";

export interface IAuthService {
  signIn(data: ISignInForm): Promise<unknown>;
}

export class AuthService implements IAuthService {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signIn(data: ISignInForm): Promise<unknown> {
    const res = await this.axios.post("", data);
    return res.data;
  }
}
