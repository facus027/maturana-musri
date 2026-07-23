import { motion } from "framer-motion"
import { useState } from "react"

import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../../animations/motionVariants"
import { contactData } from "../../data/siteData"
import { ContactModal } from "../contact/ContactModal"
import { AnimatedSection } from "../ui/AnimatedSection"

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${
    contactData.whatsapp.phone
  }?text=${encodeURIComponent(contactData.whatsapp.message)}`

  return (
    <>
      <AnimatedSection
        id={contactData.sectionId}
        className="overflow-hidden bg-maturana-navy"
        variants={staggerContainer}
        amount={0.15}
      >
        <div
          className={[
            "mx-auto grid min-h-[440px] mr-20 max-w-[1520px]",
            "lg:grid-cols-[1fr_0.72fr]",
          ].join(" ")}
        >
          {/* Información y accesos */}
          <motion.div
            variants={fadeRight}
            className={[
              "relative z-10 flex flex-col justify-center",
              "px-6 py-20 sm:px-10",
              "lg:px-12 lg:py-24",
            ].join(" ")}
          >
            <motion.p
              variants={fadeUp}
              className={[
                "font-playfair text-2xl font-bold",
                "text-white sm:text-3xl",
              ].join(" ")}
            >
              {contactData.title}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-5"
            >
              <p
                className={[
                  "font-playfair text-2xl italic leading-tight",
                  "text-maturana-ochre",
                  "sm:text-3xl",
                ].join(" ")}
              >
                {contactData.highlightedText}
              </p>

              <p
                className={[
                  "font-playfair text-2xl font-bold leading-tight",
                  "text-maturana-ochre",
                  "sm:text-3xl",
                ].join(" ")}
              >
                {contactData.supportingText}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mt-10 flex max-w-[300px] flex-col gap-2"
            >
              <motion.a
                variants={fadeUp}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "bg-maturana-ochre px-4 py-2.5",
                  "font-lato text-sm font-bold rounded-lg text-white",
                  "transition duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-white hover:text-maturana-navy",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                ].join(" ")}
              >
                {contactData.whatsapp.label}
              </motion.a>

              <motion.button
                variants={fadeUp}
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={[
                  "bg-maturana-ochre px-4 py-2.5 text-left",
                  "font-lato text-sm font-bold rounded-lg text-white",
                  "transition duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-white hover:text-maturana-navy",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                ].join(" ")}
              >
                {contactData.emailButtonLabel}
              </motion.button>

              <motion.a
                variants={fadeUp}
                href={contactData.location.url}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "bg-maturana-ochre px-4 py-2.5",
                  "font-lato text-sm rounded-lg font-bold text-white",
                  "transition duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-white hover:text-maturana-navy",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                ].join(" ")}
              >
                {contactData.location.label}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Recurso gráfico */}
          <motion.div
            variants={fadeLeft}
            aria-hidden="true"
            className={[
              "relative hidden overflow-hidden lg:block",
              "after:absolute after:inset-y-0 after:left-0",
              "after:w-28 after:bg-gradient-to-r",
              "after:from-maturana-navy after:to-transparent",
            ].join(" ")}
          >
            <img
              src={contactData.decorativeImage}
              alt=""
              className={[
                "absolute inset-0 h-full w-full",
                "scale-110 ml-10 object-cover object-left",
                "opacity-80",
              ].join(" ")}
            />
          </motion.div>
        </div>

      </AnimatedSection>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}