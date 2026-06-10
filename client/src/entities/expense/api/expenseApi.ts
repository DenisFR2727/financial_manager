import { apiClient } from "@shared/api";
import type {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from "../model/types";
import type { AxiosResponse } from "axios";

export const expenseApi = {
  getAll: (month: string) =>
    apiClient
      .get<Expense[]>("/expenses", { params: { month } })
      .then((r: AxiosResponse<Expense[]>) => r.data),

  create: (data: CreateExpenseDto) =>
    apiClient
      .post<Expense>("/expenses", data)
      .then((r: AxiosResponse<Expense>) => r.data),

  update: (id: string, data: UpdateExpenseDto) =>
    apiClient
      .put<Expense>(`/expenses/${id}`, data)
      .then((r: AxiosResponse<Expense>) => r.data),

  remove: (id: string) =>
    apiClient
      .delete(`/expenses/${id}`)
      .then((r: AxiosResponse<void>) => r.data),
};
