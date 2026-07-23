import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ingresá tu nombre completo.")
    .max(80, "El nombre no puede superar los 80 caracteres."),

  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu correo electrónico.")
    .email("Ingresá un correo electrónico válido.")
    .max(120, "El correo electrónico es demasiado extenso."),

  subject: z
    .string()
    .trim()
    .min(5, "El asunto debe tener al menos 5 caracteres.")
    .max(120, "El asunto no puede superar los 120 caracteres."),

  message: z
    .string()
    .trim()
    .min(20, "Contanos un poco más sobre tu consulta.")
    .max(1500, "El mensaje no puede superar los 1500 caracteres."),

  website: z.string().max(0),
})

export type ContactFormData = z.infer<typeof contactSchema>