import { faker } from "@faker-js/faker";
import axios from "axios";
import { AxiostHttpClient } from "./axios-http.client";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("\n HttpClient - Axios  \n", () => {
  it("should call axios with correct url", async () => {
    const url = faker.internet.url();
    const sut = new AxiostHttpClient();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
