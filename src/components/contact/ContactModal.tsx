import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { createPortal } from "react-dom"

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
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

  if (typeof document === "undefined") {
    return null
  }

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
              onClose()
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
              onClick={onClose}
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

            <div className="pr-12">
              <p className="font-lato text-xs font-bold uppercase tracking-[0.2em] text-maturana-ochre">
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

              <p className="mt-3 max-w-[480px] font-lato text-sm leading-6 text-maturana-navy/75">
                Completá tus datos y contanos brevemente cómo
                podemos ayudarte.
              </p>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-lato text-sm font-bold text-maturana-navy"
                >
                  Nombre completo
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ingresá tu nombre"
                  className={[
                    "mt-2 w-full border border-maturana-navy/20",
                    "bg-white px-4 py-3",
                    "font-lato text-sm text-maturana-navy",
                    "outline-none transition",
                    "placeholder:text-maturana-navy/40",
                    "focus:border-maturana-ochre",
                    "focus:ring-2 focus:ring-maturana-ochre/20",
                  ].join(" ")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-lato text-sm font-bold text-maturana-navy"
                >
                  Correo electrónico
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@correo.com"
                  className={[
                    "mt-2 w-full border border-maturana-navy/20",
                    "bg-white px-4 py-3",
                    "font-lato text-sm text-maturana-navy",
                    "outline-none transition",
                    "placeholder:text-maturana-navy/40",
                    "focus:border-maturana-ochre",
                    "focus:ring-2 focus:ring-maturana-ochre/20",
                  ].join(" ")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="font-lato text-sm font-bold text-maturana-navy"
                >
                  Asunto
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Motivo de la consulta"
                  className={[
                    "mt-2 w-full border border-maturana-navy/20",
                    "bg-white px-4 py-3",
                    "font-lato text-sm text-maturana-navy",
                    "outline-none transition",
                    "placeholder:text-maturana-navy/40",
                    "focus:border-maturana-ochre",
                    "focus:ring-2 focus:ring-maturana-ochre/20",
                  ].join(" ")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-lato text-sm font-bold text-maturana-navy"
                >
                  Mensaje
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Escribí tu consulta..."
                  className={[
                    "mt-2 w-full resize-none",
                    "border border-maturana-navy/20",
                    "bg-white px-4 py-3",
                    "font-lato text-sm text-maturana-navy",
                    "outline-none transition",
                    "placeholder:text-maturana-navy/40",
                    "focus:border-maturana-ochre",
                    "focus:ring-2 focus:ring-maturana-ochre/20",
                  ].join(" ")}
                />
              </div>

              <button
                type="submit"
                className={[
                  "w-full bg-maturana-navy px-6 py-3.5",
                  "font-lato text-sm font-bold text-white",
                  "transition duration-300",
                  "hover:bg-maturana-blue",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-maturana-ochre",
                  "focus-visible:ring-offset-2",
                ].join(" ")}
              >
                Enviar consulta
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}