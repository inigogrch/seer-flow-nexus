'use client'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <Logo size="lg" className="justify-center" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
        </div>
        <Button onClick={() => window.location.href = '/'}>
          Return Home
        </Button>
      </div>
    </div>
  )
}