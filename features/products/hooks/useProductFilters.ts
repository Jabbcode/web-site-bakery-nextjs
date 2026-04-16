'use client'

import { useState, useCallback } from 'react'

export interface ProductFiltersState {
  category?: string
  priceRange?: string
  featured: boolean
  new: boolean
  search?: string
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popular'
  page: number
}

export interface UseProductFiltersReturn extends ProductFiltersState {
  setCategory: (category: string | undefined) => void
  setPriceRange: (range: string | undefined) => void
  setFeatured: (featured: boolean) => void
  setNew: (isNew: boolean) => void
  setSearch: (search: string | undefined) => void
  setSortBy: (sort: ProductFiltersState['sortBy']) => void
  setPage: (page: number) => void
  clearAll: () => void
  hasActiveFilters: boolean
}

const initialState: ProductFiltersState = {
  category: undefined,
  priceRange: undefined,
  featured: false,
  new: false,
  search: undefined,
  sortBy: 'newest',
  page: 1,
}

export function useProductFilters(): UseProductFiltersReturn {
  const [filters, setFilters] = useState<ProductFiltersState>(initialState)

  const setCategory = useCallback((category: string | undefined) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }))
  }, [])

  const setPriceRange = useCallback((priceRange: string | undefined) => {
    setFilters((prev) => ({ ...prev, priceRange, page: 1 }))
  }, [])

  const setFeatured = useCallback((featured: boolean) => {
    setFilters((prev) => ({ ...prev, featured, page: 1 }))
  }, [])

  const setNew = useCallback((isNew: boolean) => {
    setFilters((prev) => ({ ...prev, new: isNew, page: 1 }))
  }, [])

  const setSearch = useCallback((search: string | undefined) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }))
  }, [])

  const setSortBy = useCallback((sortBy: ProductFiltersState['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }))
  }, [])

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  const clearAll = useCallback(() => {
    setFilters(initialState)
  }, [])

  const hasActiveFilters =
    filters.category !== undefined ||
    filters.priceRange !== undefined ||
    filters.featured ||
    filters.new ||
    (filters.search !== undefined && filters.search.length > 0)

  return {
    ...filters,
    setCategory,
    setPriceRange,
    setFeatured,
    setNew,
    setSearch,
    setSortBy,
    setPage,
    clearAll,
    hasActiveFilters,
  }
}
