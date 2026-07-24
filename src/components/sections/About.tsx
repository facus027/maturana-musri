import { motion } from "framer-motion"

import { foundersData } from "../../data/siteData"
import { AnimatedSection } from "../ui/AnimatedSection"
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  staggerContainer,
} from "../../animations/motionVariants"

export function About() {
  const [karen, andrea] = foundersData.members

  return (
    <AnimatedSection
      id={foundersData.sectionId}
      className="bg-maturana-beige"
      variants={staggerContainer}
      amount={0.18}
    >
      <div className="mx-auto w-10/12 pt-5">

        <motion.div
          variants={fadeUp}
          className="max-w-[1250px] mx-auto"
        >
          <h2 className="font-playfair text-3xl font-bold text-maturana-navy sm:text-4xl">
            {foundersData.title}
          </h2>

          <p className="mt-4 max-w-[1250px] font-lato text-[15px] tracking-wide text-maturana-navy/90 sm:text-xl">
            {foundersData.introduction}
          </p>

          <p className="mt-6 max-w-[1250px] font-playfair text-3xl font-semibold italic leading-tight text-maturana-ochre sm:text-4xl lg:text-6xl">
            {foundersData.highlightedText}
          </p>
        </motion.div>

<div className="mt-10 mx-auto grid items-end gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-8">
  <motion.article
    variants={fadeRight}
    className="order-1 mb-5 text-center lg:order-1 lg:pb-44 lg:text-right"
  >
    <h3 className="font-playfair text-2xl font-bold leading-tight text-maturana-navy lg:text-5xl">
      {karen.name}
      <span className="block uppercase">
        {karen.lastName}
      </span>
    </h3>

    <p className="mt-5 font-lato text-sm font-medium leading-6 text-maturana-navy/90 sm:text-2xl sm:leading-7 lg:text-right">
      {karen.description}
    </p>
  </motion.article>

  <motion.figure
    variants={scaleIn}
    className="order-2 mx-auto w-full lg:order-2"
  >
    <img
      src={foundersData.groupImage}
      alt={foundersData.groupImageAlt}
      loading="eager"
      className="h-auto w-full object-contain"
    />
  </motion.figure>

  <motion.article
    variants={fadeLeft}
    className="order-3 mb-5 text-center lg:pb-3 lg:text-left"
  >
    <h3 className="font-playfair text-2xl font-bold leading-tight text-maturana-navy lg:text-5xl">
      {andrea.name}
      <span className="block uppercase">
        {andrea.lastName}
      </span>
    </h3>

    <p className="mt-5 font-lato text-sm font-medium leading-6 text-maturana-navy/90 sm:text-2xl sm:leading-7 lg:text-left">
      {andrea.description}
    </p>
  </motion.article>
</div>

      </div>
    </AnimatedSection>
  )
}