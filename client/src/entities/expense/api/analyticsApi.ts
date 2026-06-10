import { apiClient } from '@shared/api';
import type { AxiosResponse } from 'axios';
import type { CategoryAnalytics, MonthlyTotal } from '../model/types';

export const analyticsApi = {
  getByCategory: (month: string) =>
    apiClient
      .get<CategoryAnalytics[]>('/analytics/by-category', { params: { month } })
      .then((r: AxiosResponse<CategoryAnalytics[]>) => r.data),

  getMonthlyTotal: (month: string) =>
    apiClient
      .get<MonthlyTotal>('/analytics/monthly-total', { params: { month } })
      .then((r: AxiosResponse<MonthlyTotal>) => r.data),
};
