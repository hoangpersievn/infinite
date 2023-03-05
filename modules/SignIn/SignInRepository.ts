import { TCredentials } from "@/components/Templates/Auth";
import { IHttpClient } from "@/core/httpClient";

export class SignInRepository {
  private client: IHttpClient;

  constructor(client: IHttpClient) {
    this.client = client;
  }

  public signIn(url: string, credentials: TCredentials) {
    return this.client(url, credentials);
  }
};