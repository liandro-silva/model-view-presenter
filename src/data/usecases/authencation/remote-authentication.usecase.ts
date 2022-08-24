import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient } from "@/data/protocols/http/http-post.client";
import { HttpStatusCode } from "@/data/protocols/http/http-response.client";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { AccountModel } from "@/domain/models/account.model";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async execute(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
