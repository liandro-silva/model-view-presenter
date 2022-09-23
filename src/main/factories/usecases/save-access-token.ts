import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token.usecase'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter.factory'

export const makeLocalSaveAccessToken = (): LocalSaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
