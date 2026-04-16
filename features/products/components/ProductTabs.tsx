'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface ProductTab {
  id: string
  label: string
  content: React.ReactNode
}

export interface ProductTabsProps {
  tabs: ProductTab[]
  defaultTab?: string
  className?: string
}

export const ProductTabs = ({ tabs, defaultTab, className }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  if (tabs.length === 0) {
    return null
  }

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="border-b border-[#dadada]">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'font-display relative pb-4 text-[18px] font-medium transition-colors',
                'hover:text-[#241c10]',
                activeTab === tab.id ? 'text-[#241c10]' : 'text-[#63605a]'
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}

              {/* Active Indicator */}
              {activeTab === tab.id && (
                <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#241c10]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">{activeTabContent}</div>
    </div>
  )
}
