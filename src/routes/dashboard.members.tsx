import { createFileRoute } from '@tanstack/react-router'
import MembersPage from '../pages/Members'
export const Route = createFileRoute('/dashboard/members')({
  component: MembersPage,
})

