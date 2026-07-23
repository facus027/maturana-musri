export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string

  // Campo invisible para reducir envíos automatizados.
  website: string
}

export type ContactFormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error"