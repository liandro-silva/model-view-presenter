import { faker } from "@faker-js/faker";
import axios from "axios";

export const mockHttpResponse = (): any => ({
  data: faker.finance.pin(),
  status: faker.datatype.number(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
