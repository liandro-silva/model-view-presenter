import { HttpPostClientSpy } from "../../test/http-client.mock";
import { RemoteAuthentication } from "./remote-authentication.usecase";

describe("UseCase - Remote Authentication", () => {
  it("should call HttpPostClient with correct url", async () => {
    const url = "any_url";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.execute();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
