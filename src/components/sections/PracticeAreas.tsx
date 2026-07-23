import { motion } from "framer-motion"

import { practiceAreasData } from "../../data/siteData"
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../../animations/motionVariants"
import { AnimatedSection } from "../ui/AnimatedSection"

type PracticeArea = {
  id: string
  title: string
  icon: string
  iconAlt: string
  services: string[]
  highlightedText?: string
}

type PracticeAreaBlockProps = {
  area: PracticeArea
  direction: "left" | "right"
  compact?: boolean
}

function PracticeAreaBlock({
  area,
  direction,
  compact = false,
}: PracticeAreaBlockProps) {
  const visibleServices = area.highlightedText
    ? area.services.filter(
        (service) => service !== area.highlightedText,
      )
    : area.services

  return (
    <motion.article
      variants={direction === "left" ? fadeRight : fadeLeft}
      className="flex h-full flex-col"
    >
      <div className="flex min-h-[62px] items-end">
        <img
          src={area.icon}
          alt={area.iconAlt}
          className="w-36 h-36 object-contain"
        />
      </div>

      <span
        aria-hidden="true"
        className="mt-0 block h-px w-full bg-maturana-ochre"
      />

      <h3
        className={[
          "mt-3 font-playfair font-bold leading-[0.95]",
          "text-maturana-navy",
          compact
            ? "max-w-[2700px] text-[1.45rem] sm:text-4xl"
            : "text-2xl sm:text-4xl",
        ].join(" ")}
      >
        {area.title}
      </h3>

      <ul
        className={[
          "mt-5 space-y-1 font-lato text-maturana-navy",
          compact
            ? "text-sm lg:text-xl font-bold leading-5"
            : "text-sm lg:text-xl font-bold leading-[1.45]",
        ].join(" ")}
      >
        {visibleServices.map((service) => (
          <li
            key={service}
            className="relative lg:pl-4 pl-3"
          >
            <span
              aria-hidden="true"
              className={[
                "absolute left-0 top-[0.62rem]",
                "lg:h-2.5 h-1.5 w-1.5 lg:w-2.5 rounded-full bg-maturana-navy",
              ].join(" ")}
            />

            {service}
          </li>
        ))}
      </ul>

      {area.highlightedText && (
        <div className="mt-auto pt-5">
          <span
            aria-hidden="true"
            className="mb-4 block h-px w-full bg-maturana-ochre"
          />

          <p
            className={[
              "max-w-[440px] font-playfair text-xl italic",
              "leading-tight text-maturana-ochre",
              "sm:text-2xl",
            ].join(" ")}
          >
            {area.highlightedText}
          </p>
        </div>
      )}
    </motion.article>
  )
}

export function PracticeAreas() {
  return (
    <AnimatedSection
      id={practiceAreasData.sectionId}
      className="bg-maturana-beige"
      variants={staggerContainer}
      amount={0.1}
    >
      <div
        className={[
          "mx-auto max-w-[1300px]",
          "px-6 py-14 sm:px-8 md:py-24 lg:px-12 lg:py-28",
        ].join(" ")}
      >
        {/* Áreas principales */}
        <motion.section variants={staggerContainer}>
          <motion.h2
            variants={fadeUp}
            className={[
              "text-center font-playfair text-4xl font-bold",
              "text-maturana-navy",
              "sm:text-6xl",
            ].join(" ")}
          >
            {practiceAreasData.personalized.title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className={[
              "mt-14 grid gap-16",
              "md:grid-cols-2 md:gap-12",
              "lg:mt-16 lg:gap-16",
            ].join(" ")}
          >
            {practiceAreasData.personalized.areas.map(
              (area, index) => (
                <PracticeAreaBlock
                  key={area.id}
                  area={area}
                  direction={index === 0 ? "left" : "right"}
                />
              ),
            )}
          </motion.div>
        </motion.section>

        {/* Áreas complementarias */}
        <motion.section
          variants={staggerContainer}
          className="mt-24 md:mt-28"
        >
          <motion.h2
            variants={fadeUp}
            className={[
              "text-center font-playfair text-4xl font-bold",
              "text-maturana-navy",
              "sm:text-6xl",
            ].join(" ")}
          >
            {practiceAreasData.complementary.title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className={[
              "mt-14 grid gap-16",
              "md:grid-cols-2 md:gap-12",
              "lg:mt-16 lg:gap-16",
            ].join(" ")}
          >
            {practiceAreasData.complementary.areas.map(
              (area, index) => (
                <PracticeAreaBlock
                  key={area.id}
                  area={area}
                  direction={index === 0 ? "left" : "right"}
                  compact
                />
              ),
            )}
          </motion.div>
        </motion.section>
      </div>
    </AnimatedSection>
  )
}