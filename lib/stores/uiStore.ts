import { create } from 'zustand'

interface UIState {
  isCartDrawerOpen: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  openCartDrawer: () => void
  closeCartDrawer: () => void
  toggleCartDrawer: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  isCartDrawerOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}))
