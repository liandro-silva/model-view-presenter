import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'

import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError, EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
    AddAccountParams,
    AccountModel
    >
  ) {}

  async execute (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
