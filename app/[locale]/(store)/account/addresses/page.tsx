'use client'

import { useState, useEffect } from 'react'
import { Address, AddressFormData } from '@/features/addresses/types'
import { AddressCard } from '@/features/addresses/components/AddressCard'
import { AddressForm } from '@/features/addresses/components/AddressForm'
import { Button } from '@/components/atoms/Button'

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchAddresses = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/addresses')

      if (!response.ok) {
        throw new Error('Failed to fetch addresses')
      }

      const data = await response.json()
      setAddresses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleAddNew = () => {
    setEditingAddress(null)
    setShowForm(true)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const getFormDataFromAddress = (address: Address): AddressFormData => {
    return {
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone || undefined,
      street: address.street,
      city: address.city,
      state: address.state || undefined,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault,
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingAddress(null)
  }

  const handleSubmit = async (data: AddressFormData) => {
    try {
      setIsSubmitting(true)
      const url = editingAddress ? `/api/addresses/${editingAddress.id}` : '/api/addresses'
      const method = editingAddress ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(editingAddress ? 'Failed to update address' : 'Failed to create address')
      }

      await fetchAddresses()
      setShowForm(false)
      setEditingAddress(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return
    }

    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete address')
      }

      await fetchAddresses()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const handleSetDefault = async (addressId: string) => {
    try {
      const address = addresses.find((a) => a.id === addressId)
      if (!address) return

      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...address, isDefault: true }),
      })

      if (!response.ok) {
        throw new Error('Failed to set default address')
      }

      await fetchAddresses()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-text">Loading addresses...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-h3 font-display text-dark">My Addresses</h2>
          <p className="text-text mt-2">Manage your shipping and billing addresses</p>
        </div>
        {!showForm && (
          <Button variant="primary" size="md" onClick={handleAddNew}>
            Add New Address
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
          <h3 className="text-h5 font-display text-dark mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <AddressForm
            initialData={editingAddress ? getFormDataFromAddress(editingAddress) : undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {!showForm && addresses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-card">
          <svg
            className="mx-auto h-12 w-12 text-text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="mt-4 text-h5 font-display text-dark">No addresses yet</h3>
          <p className="mt-2 text-text">Add your first address to make checkout faster!</p>
        </div>
      )}

      {!showForm && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}
    </div>
  )
}
