import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"

import { contactSchema } from "./contact.schema"
import { sendContactForm } from "./contact.service"
import type {
  ContactFormData,
  ContactFormStatus,
} from "./contact.types"

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}

const defaultValues: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
}

export function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
  const [status, setStatus] =
    useState<ContactFormStatus>("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  function handleClose() {
    onClose()

    window.setTimeout(() => {
      reset(defaultValues)
      setStatus("idle")
    }, 300)
  }

  async function onSubmit(data: ContactFormData) {
    try {
      setStatus("sending")

      await sendContactForm(data)

      reset(defaultValues)
      setStatus("success")
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setStatus("error")
    }
  }

  if (typeof document === "undefined") {
    return null
  }

  const inputClassName = [
    "mt-2 w-full border bg-white px-4 py-3",
    "font-lato text-sm text-maturana-navy",
    "outline-none transition",
    "placeholder:text-maturana-navy/40",
    "focus:border-maturana-ochre",
    "focus:ring-2 focus:ring-maturana-ochre/20",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ")

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={[
            "fixed inset-0 z-[100]",
            "flex items-center justify-center",
            "overflow-y-auto bg-maturana-navy/75",
            "px-4 py-8 backdrop-blur-sm",
          ].join(" ")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose()
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "relative w-full max-w-[620px]",
              "bg-maturana-beige px-6 py-8",
              "shadow-[0_28px_80px_rgba(5,19,31,0.35)]",
              "sm:px-10 sm:py-10",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar formulario de contacto"
              className={[
                "absolute right-5 top-5",
                "grid h-10 w-10 place-items-center",
                "rounded-full text-2xl text-maturana-navy",
                "transition-colors duration-300",
                "hover:bg-maturana-ochre/25",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-maturana-navy",
              ].join(" ")}
            >
              <span aria-hidden="true">×</span>
            </button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={[
                    "flex min-h-[440px] flex-col",
                    "items-center justify-center text-center",
                  ].join(" ")}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.75,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                      duration: 0.4,
                    }}
                    className={[
                      "grid h-16 w-16 place-items-center",
                      "rounded-full border-2",
                      "border-maturana-ochre",
                      "font-lato text-2xl font-bold",
                      "text-maturana-ochre",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    ✓
                  </motion.div>

                  <h2
                    id="contact-modal-title"
                    className={[
                      "mt-7 font-playfair text-3xl font-bold",
                      "text-maturana-navy sm:text-4xl",
                    ].join(" ")}
                  >
                    Gracias por escribirnos
                  </h2>

                  <p
                    className={[
                      "mt-4 max-w-[430px]",
                      "font-lato text-sm leading-6",
                      "text-maturana-navy/75",
                    ].join(" ")}
                  >
                    Hemos recibido tu consulta correctamente.
                    Nos pondremos en contacto con vos a la
                    brevedad.
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className={[
                      "mt-8 bg-maturana-navy px-8 py-3",
                      "font-lato text-sm font-bold text-white",
                      "transition duration-300",
                      "hover:bg-maturana-blue",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-maturana-ochre",
                    ].join(" ")}
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pr-12">
                    <p
                      className={[
                        "font-lato text-xs font-bold uppercase",
                        "tracking-[0.2em] text-maturana-ochre",
                      ].join(" ")}
                    >
                      Maturana Musri & Asociados
                    </p>

                    <h2
                      id="contact-modal-title"
                      className={[
                        "mt-3 font-playfair text-3xl font-bold",
                        "text-maturana-navy sm:text-4xl",
                      ].join(" ")}
                    >
                      Envíanos tu consulta
                    </h2>

                    <p
                      className={[
                        "mt-3 max-w-[480px]",
                        "font-lato text-sm leading-6",
                        "text-maturana-navy/75",
                      ].join(" ")}
                    >
                      Completá tus datos y contanos brevemente
                      cómo podemos ayudarte.
                    </p>
                  </div>

                  <form
                    className="mt-8 space-y-5"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    {/* Honeypot antispam */}
                    <div
                      className="absolute -left-[9999px]"
                      aria-hidden="true"
                    >
                      <label htmlFor="contact-website">
                        Sitio web
                      </label>

                      <input
                        id="contact-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-name"
                        className={[
                          "font-lato text-sm font-bold",
                          "text-maturana-navy",
                        ].join(" ")}
                      >
                        Nombre completo
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Ingresá tu nombre"
                        disabled={isSubmitting}
                        aria-invalid={
                          errors.name ? "true" : "false"
                        }
                        aria-describedby={
                          errors.name
                            ? "contact-name-error"
                            : undefined
                        }
                        {...register("name")}
                        className={[
                          inputClassName,
                          errors.name
                            ? "border-red-700"
                            : "border-maturana-navy/20",
                        ].join(" ")}
                      />

                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 font-lato text-xs text-red-700"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className={[
                          "font-lato text-sm font-bold",
                          "text-maturana-navy",
                        ].join(" ")}
                      >
                        Correo electrónico
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        placeholder="nombre@correo.com"
                        disabled={isSubmitting}
                        aria-invalid={
                          errors.email ? "true" : "false"
                        }
                        aria-describedby={
                          errors.email
                            ? "contact-email-error"
                            : undefined
                        }
                        {...register("email")}
                        className={[
                          inputClassName,
                          errors.email
                            ? "border-red-700"
                            : "border-maturana-navy/20",
                        ].join(" ")}
                      />

                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 font-lato text-xs text-red-700"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className={[
                          "font-lato text-sm font-bold",
                          "text-maturana-navy",
                        ].join(" ")}
                      >
                        Asunto
                      </label>

                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Motivo de la consulta"
                        disabled={isSubmitting}
                        aria-invalid={
                          errors.subject ? "true" : "false"
                        }
                        aria-describedby={
                          errors.subject
                            ? "contact-subject-error"
                            : undefined
                        }
                        {...register("subject")}
                        className={[
                          inputClassName,
                          errors.subject
                            ? "border-red-700"
                            : "border-maturana-navy/20",
                        ].join(" ")}
                      />

                      {errors.subject && (
                        <p
                          id="contact-subject-error"
                          role="alert"
                          className="mt-1.5 font-lato text-xs text-red-700"
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className={[
                          "font-lato text-sm font-bold",
                          "text-maturana-navy",
                        ].join(" ")}
                      >
                        Mensaje
                      </label>

                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Escribí tu consulta..."
                        disabled={isSubmitting}
                        aria-invalid={
                          errors.message ? "true" : "false"
                        }
                        aria-describedby={
                          errors.message
                            ? "contact-message-error"
                            : undefined
                        }
                        {...register("message")}
                        className={[
                          inputClassName,
                          "resize-none",
                          errors.message
                            ? "border-red-700"
                            : "border-maturana-navy/20",
                        ].join(" ")}
                      />

                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 font-lato text-xs text-red-700"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {status === "error" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        role="alert"
                        className={[
                          "border border-red-700/25",
                          "bg-red-50 px-4 py-3",
                          "font-lato text-sm text-red-800",
                        ].join(" ")}
                      >
                        No pudimos enviar la consulta. Revisá tu
                        conexión e intentá nuevamente.
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={[
                        "w-full bg-maturana-navy px-6 py-3.5",
                        "font-lato text-sm font-bold text-white",
                        "transition duration-300",
                        "hover:bg-maturana-blue",
                        "disabled:cursor-not-allowed",
                        "disabled:opacity-65",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-maturana-ochre",
                        "focus-visible:ring-offset-2",
                      ].join(" ")}
                    >
                      {isSubmitting
                        ? "Enviando consulta..."
                        : "Enviar consulta"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}