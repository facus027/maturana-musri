import { motion } from "framer-motion"

import { introductionData } from "../../data/siteData"
import { AnimatedSection } from "../ui/AnimatedSection"
import { fadeUp, staggerContainer } from "../../animations/motionVariants"

export function Introduction() {
  return (
    <AnimatedSection
      className="bg-maturana-beige flex lg:py-24 py-16 text-justify m-7"
      variants={staggerContainer}
      amount={0.25}
    >
      <div className="mx-auto justify-center items-center">
        <motion.h2
          variants={fadeUp}
          className={[
            "font-playfair text-xl font-bold leading-tight",
            "text-maturana-navy",
            "sm:text-3xl lg:text-4xl",
          ].join(" ")}
        >
          {introductionData.title}{" "}
          <span className="italic">
            {introductionData.highlightedTitle}
          </span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="mt-7 max-w-[1250px]"
        >
          {introductionData.paragraphs.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={fadeUp}
              className={[
                "font-medium text-base ",
                "text-maturana-navy/90",
                "sm:text-xl ",
              ].join(" ")}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}