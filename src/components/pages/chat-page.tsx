'use client'

import { AppLayout } from '@/components/layout/app-layout'

export function ChatPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">AI Chat</h1>
          <p className="text-muted-foreground">
            Chat functionality will be implemented here with server actions.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}