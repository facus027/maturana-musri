import { motion } from "framer-motion"

import {
  fadeIn,
  fadeUp,
  staggerContainer,
} from "../../animations/motionVariants"
import { teamData } from "../../data/siteData"
import { TeamCarousel } from "../team/TeamCarousel"
import { AnimatedSection } from "../ui/AnimatedSection"

export function Team() {
  return (
    <AnimatedSection
      id={teamData.sectionId}
      className="overflow-hidden bg-maturana-navy"
      variants={staggerContainer}
      amount={0.08}
    >
      {/* Fotografía grupal */}
      <motion.div
        variants={fadeIn}
        className="relative overflow-hidden"
      >
        <img
          src={teamData.groupImage}
          alt={teamData.groupImageAlt}
          loading="lazy"
          className={[
            "h-auto max-h-[1060px] w-full",
            "object-cover object-center",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0",
            "h-20 bg-gradient-to-t",
            "from-maturana-navy to-transparent",
          ].join(" ")}
        />
      </motion.div>

      {/* Carrusel */}
      <div
        className={[
          "mx-auto max-w-[1820px]",
          "px-6 pb-20 pt-12",
          "sm:px-8 md:pb-24 md:pt-14",
          "lg:px-12 lg:pb-28",
        ].join(" ")}
      >
        <motion.h2
          variants={fadeUp}
          className={[
            "text-center font-playfair",
            "text-4xl font-bold text-maturana-ochre",
            "sm:text-5xl",
          ].join(" ")}
        >
          {teamData.title}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-12"
        >
          <TeamCarousel members={teamData.members} />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}