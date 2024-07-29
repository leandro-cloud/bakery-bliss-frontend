import { z } from 'zod'

export const registerEditSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido').refine(value => value.trim() !== '', { message: 'El nombre es requerido' }),
  lastName: z.string().min(1, 'El apellido es requerido').refine(value => value.trim() !== '', { message: 'El apellido es requerido' }),
  userName: z.string().min(1, 'El username es requerido').refine(value => value.trim() !== '', { message: 'El username es requerido' }),
  email: z.string().min(8, 'Debe tener al menos 8 caracteres').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i, { message: "Formato no válido" })
})

export const passwordChangeShcema = z.object({
  oldPassword: z.string().min(4, "Debe tener al menos 4 caracteres."),
  newPassword: z.string().min(4, "Debe tener al menos 4 caracteres."),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"]
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(4, "Debe tener al menos 4 caracteres."),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"]
})