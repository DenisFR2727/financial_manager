import { useQuery } from '@tanstack/react-query';
import { categoryApi } from './categoryApi';
import { categoryKeys } from './queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryApi.getAll(),
    staleTime: 1000 * 60 * 10,
  });
}
