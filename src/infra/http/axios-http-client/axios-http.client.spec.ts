import { AxiostHttpClient } from "./axios-http.client";

import { mockPostRequest } from "@/data/mocks";
import { mockAxios, mockHttpResponse } from "@/infra/mocks";

import axios from "axios";

jest.mock("axios");

type SutProps = {
  sut: AxiostHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutProps => {
  const sut = new AxiostHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe("\n HttpClient - Axios  \n", () => {
  it("should call axios with correct values", async () => {
    const { mockedAxios, sut } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("should return the correct status code and body", () => {
    const { mockedAxios, sut } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  it("should return the correct status code and body on failure", () => {
    const { mockedAxios, sut } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
