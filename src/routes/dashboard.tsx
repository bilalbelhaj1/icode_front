import { createFileRoute } from '@tanstack/react-router'
import DashboardLayout from '../pages/Layout'
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})
