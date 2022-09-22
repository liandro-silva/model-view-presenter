import { SaveAccessToken } from '@/domain/usecases'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string
  async execute (accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
