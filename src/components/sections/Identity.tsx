import { motion } from "framer-motion"

import { identityData } from "../../data/siteData"
import {
  fadeUp,
  scaleIn,
  staggerContainer,
} from "../../animations/motionVariants"
import { AnimatedSection } from "../ui/AnimatedSection"

export function Identity() {
  const valuesCard = identityData.valuesCard

  return (
    <AnimatedSection
      id={identityData.sectionId}
      className="relative overflow-hidden bg-maturana-navy"
      variants={staggerContainer}
      amount={0.12}
    >
    

      <div className="relative z-10 mx-auto w-full px-6 pb-20 pt-20 sm:px-8 md:py-24 lg:px-12 lg:py-0 lg:pt-28">
        {/* Presentación institucional */}
        <motion.div
          variants={staggerContainer}
          className="mx-auto max-w-[1200px]"
        >
          <div className="space-y-2">
            {identityData.introduction.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                variants={fadeUp}
                className={[
                  "font-lato text-base text-white/90",
                  "sm:text-xl sm:leading-8",
                  index === identityData.introduction.length - 1
                    ? "font-bold text-white"
                    : "",
                ].join(" ")}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-9"
          >
            {identityData.highlightedText.map((text) => (
              <p
                key={text}
                className={[
                  "font-playfair text-2xl font-bold italic",
                  "leading-tight text-maturana-ochre",
                  "sm:text-3xl lg:text-4xl w-10/12",
                ].join(" ")}
              >
                {text}
              </p>
            ))}
          </motion.div>
        </motion.div>

        {/* Tarjetas */}
        <motion.div
          variants={staggerContainer}
          className={[
            "mt-14 grid gap-6",
            "md:grid-cols-2",
            "lg:translate-y-16 lg:grid-cols-3 lg:gap-5",
          ].join(" ")}
        >
          {identityData.textCards.map((card) => (
            <motion.article
              key={card.id}
              variants={scaleIn}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                "group flex min-h-[470px] flex-col",
                "bg-maturana-blue px-7 py-9",
                "shadow-[0_18px_45px_rgba(5,19,31,0.16)]",
                "transition-shadow duration-500",
                "hover:shadow-[0_24px_55px_rgba(5,19,31,0.28)]",
                "sm:px-9 sm:py-10",
              ].join(" ")}
            >
              <div className="flex flex-col items-center">
                <img
                  src={card.icon}
                  alt={card.iconAlt}
                  className={[
                    "lg:h-40 h-32 w-auto object-contain",
                    "transition-transform duration-500",
                    "group-hover:scale-[1.06]",
                  ].join(" ")}
                />

                <h3
                  className={[
                    "mt-6 font-playfair text-4xl font-bold italic",
                    "text-maturana-ochre",
                  ].join(" ")}
                >
                  {card.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="mt-0 h-px w-full bg-maturana-ochre/70"
                />
              </div>

              <div className="mt-6 space-y-4 text-center">
                {card.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-lato text-xl  text-white/90"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Valores tiene una estructura interna diferente */}
          <motion.article
            variants={scaleIn}
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "group flex min-h-[470px] flex-col",
              "bg-maturana-blue px-7 py-9",
              "shadow-[0_18px_45px_rgba(5,19,31,0.16)]",
              "transition-shadow duration-500",
              "hover:shadow-[0_24px_55px_rgba(5,19,31,0.28)]",
              "sm:px-9 sm:py-10",
              "md:col-span-2 lg:col-span-1",
            ].join(" ")}
          >
            <div className="flex flex-col items-center">
              <img
                src={valuesCard.icon}
                alt={valuesCard.iconAlt}
                className={[
                  "h-40 w-auto object-contain",
                  "transition-transform duration-500",
                  "group-hover:scale-[1.06]",
                ].join(" ")}
              />

              <h3
                className={[
                  "mt-6 font-playfair text-4xl font-bold italic",
                  "text-maturana-ochre",
                ].join(" ")}
              >
                {valuesCard.title}
              </h3>

              <span
                aria-hidden="true"
                className=" h-px w-full mb-6 bg-maturana-ochre/70"
              />
            </div>

            <ul className="">
              {valuesCard.values.map((value) => (
                <li
                  key={value.title}
                  className={[
                    "relative pl-4 text-xl",
                    "font-lato text-sm text-white/90",
                    "before:absolute before:left-0 before:top-[0.65rem]",
                    "before:h-1 before:w-1 before:rounded-full",
                    "before:bg-maturana-ochre",
                  ].join(" ")}
                >
                  <strong className="font-bold text-maturana-ochre">
                    {value.title}:
                  </strong>{" "}
                  {value.description}
                </li>
              ))}
            </ul>
          </motion.article>
        </motion.div>
      </div>

      {/* Espacio para alojar el desplazamiento de las cards en desktop */}
      <div className="hidden h-16 bg-white lg:block" />
    </AnimatedSection>
  )
}