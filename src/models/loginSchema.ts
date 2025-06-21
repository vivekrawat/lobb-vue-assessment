import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address')
})

export type Login = z.infer<typeof LoginSchema>
