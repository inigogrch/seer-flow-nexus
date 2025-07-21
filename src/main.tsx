import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import HomePage from './app/page'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >
    <QueryProvider>
      <TooltipProvider>
        <HomePage />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryProvider>
  </ThemeProvider>
);