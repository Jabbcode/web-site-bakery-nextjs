export interface Address {
  id: string
  firstName: string
  lastName: string
  phone: string | null
  street: string
  city: string
  state: string | null
  zip: string
  country: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface AddressFormData {
  firstName: string
  lastName: string
  phone?: string
  street: string
  city: string
  state?: string
  zip: string
  country: string
  isDefault?: boolean
}
