import { HttpPostParams } from "@/data/protocols/http";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { AxiostHttpClient } from "./axios-http.client";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosReult = {
  data: faker.finance.pin(),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosReult);

const makeSut = (): AxiostHttpClient => {
  return new AxiostHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.commerce.productName,
});

describe("\n HttpClient - Axios  \n", () => {
  it("should call axios with correct values", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("should return the correct status code and body", async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosReult.status,
      body: mockedAxiosReult.data,
    });
  });
});
