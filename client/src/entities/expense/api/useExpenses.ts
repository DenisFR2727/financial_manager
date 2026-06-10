import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateExpenseDto, UpdateExpenseDto } from '../model/types';
import { analyticsApi } from './analyticsApi';
import { expenseApi } from './expenseApi';
import { analyticsKeys, expenseKeys } from './queryKeys';

export function useExpenses(month: string) {
  return useQuery({
    queryKey: expenseKeys.list(month),
    queryFn: () => expenseApi.getAll(month),
  });
}

export function useCategoryAnalytics(month: string) {
  return useQuery({
    queryKey: analyticsKeys.byCategory(month),
    queryFn: () => analyticsApi.getByCategory(month),
  });
}

export function useMonthlyTotal(month: string) {
  return useQuery({
    queryKey: analyticsKeys.monthlyTotal(month),
    queryFn: () => analyticsApi.getMonthlyTotal(month),
  });
}

function invalidateExpenseQueries(queryClient: ReturnType<typeof useQueryClient>, month: string) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: expenseKeys.list(month) }),
    queryClient.invalidateQueries({ queryKey: analyticsKeys.byCategory(month) }),
    queryClient.invalidateQueries({ queryKey: analyticsKeys.monthlyTotal(month) }),
  ]);
}

export function useCreateExpense(month: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseDto) => expenseApi.create(data),
    onSuccess: () => invalidateExpenseQueries(queryClient, month),
  });
}

export function useUpdateExpense(month: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseDto }) =>
      expenseApi.update(id, data),
    onSuccess: () => invalidateExpenseQueries(queryClient, month),
  });
}

export function useDeleteExpense(month: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expenseApi.remove(id),
    onSuccess: () => invalidateExpenseQueries(queryClient, month),
  });
}
