export interface SaveAccessToken {
  execute: (accessToken: string) => Promise<void>
}
