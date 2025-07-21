'use client'

import { AppLayout } from '@/components/layout/app-layout'

export function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Settings functionality will be implemented here.
        </p>
      </div>
    </AppLayout>
  )
}