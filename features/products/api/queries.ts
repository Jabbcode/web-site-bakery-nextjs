import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import {
  getProducts,
  getProduct,
  type GetProductsParams,
  type GetProductsResponse,
  type ProductDetail,
} from '.'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: GetProductsParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
}

export function useProducts(
  params: GetProductsParams = {},
  options?: Omit<UseQueryOptions<GetProductsResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    ...options,
  })
}

export function useProduct(
  slug: string,
  options?: Omit<UseQueryOptions<ProductDetail>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProduct(slug),
    enabled: !!slug,
    ...options,
  })
}
