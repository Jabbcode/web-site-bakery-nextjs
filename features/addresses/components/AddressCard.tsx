'use client'

import { Address } from '../types'
import { Button } from '@/components/atoms/Button'

interface AddressCardProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (addressId: string) => void
  onSetDefault: (addressId: string) => void
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg p-6 relative">
      {address.isDefault && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
            Default
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-h6 font-display text-dark mb-2">
          {address.firstName} {address.lastName}
        </h3>
        <div className="text-sm text-text space-y-1">
          <p>{address.street}</p>
          <p>
            {address.city}
            {address.state && `, ${address.state}`} {address.zip}
          </p>
          <p>{address.country}</p>
          {address.phone && <p className="pt-2">Phone: {address.phone}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="light" size="sm" onClick={() => onEdit(address)}>
          Edit
        </Button>
        {!address.isDefault && (
          <Button variant="light" size="sm" onClick={() => onSetDefault(address.id)}>
            Set as Default
          </Button>
        )}
        <Button variant="danger" size="sm" onClick={() => onDelete(address.id)}>
          Delete
        </Button>
      </div>
    </div>
  )
}
