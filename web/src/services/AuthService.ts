import type { AxiosInstance } from "axios";
import type { ISignInForm, ITokenInfo } from "../commons/types";

export interface IAuthService {
  signIn(data: ISignInForm, signal: AbortSignal): Promise<unknown>;
  tokenInfo(signal: AbortSignal): Promise<ITokenInfo>;
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
}
