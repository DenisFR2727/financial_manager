import { apiClient } from "@shared/api";
import type { Category } from "../model/types";
import type { AxiosResponse } from "axios";

export const categoryApi = {
  getAll: () =>
    apiClient
      .get<Category[]>("/categories")
      .then((r: AxiosResponse<Category[]>) => r.data),
};
