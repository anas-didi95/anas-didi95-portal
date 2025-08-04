import type { ISignInForm, ITokenInfo } from "@/commons/types";
import type { AxiosInstance } from "axios";

export class AuthService {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signIn(data: ISignInForm, signal: AbortSignal) {
    const res = await this.axios.post<unknown>("/signIn", data, { signal });
    return res.data;
  }

  async tokenInfo(signal: AbortSignal) {
    const res = await this.axios.get<ITokenInfo>("/tokenInfo", { signal });
    return res.data;
  }

  async signOut(signal: AbortSignal) {
    const res = await this.axios.post<unknown>("/signOut", null, { signal });
    return res.data;
  }
}
