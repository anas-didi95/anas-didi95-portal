import type { ISignInForm, ITokenInfo } from "@/commons/types";
import type { AxiosInstance } from "axios";

export interface IAuthService {
  signIn(data: ISignInForm, signal: AbortSignal): Promise<unknown>;
  tokenInfo(signal: AbortSignal): Promise<ITokenInfo>;
  signOut(signal: AbortSignal): Promise<unknown>;
}

export class AuthService implements IAuthService {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signIn(data: ISignInForm, signal: AbortSignal): Promise<unknown> {
    const res = await this.axios.post("/signIn", data, { signal });
    return res.data;
  }

  async tokenInfo(signal: AbortSignal): Promise<ITokenInfo> {
    const res = await this.axios.get<ITokenInfo>("/tokenInfo", { signal });
    return res.data;
  }

  async signOut(signal: AbortSignal): Promise<unknown> {
    const res = await this.axios.post("/signOut", null, { signal });
    return res.data;
  }
}
