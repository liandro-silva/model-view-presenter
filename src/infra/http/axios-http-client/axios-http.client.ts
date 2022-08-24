import axios from "axios";
import { HttpPostParams } from "@/data/protocols/http";

export class AxiostHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}
