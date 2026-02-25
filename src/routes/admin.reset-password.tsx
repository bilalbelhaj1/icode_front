import { createFileRoute } from '@tanstack/react-router'
import ResetPassword from '../pages/ResetPassword'
export const Route = createFileRoute('/admin/reset-password')({
  component: ResetPassword,
})

