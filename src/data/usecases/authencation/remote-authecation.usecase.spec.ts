import { HttpPostClientSpy } from "../../test/http-client.mock";
import { RemoteAuthentication } from "./remote-authentication.usecase";

import { faker } from "@faker-js/faker";
import { mockAuthentication } from "../../../domain/test/authentication.mock";

type SutProps = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutProps => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("UseCase - Remote Authentication", () => {
  it("should call HttpPostClient with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.execute(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it("should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.execute(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
