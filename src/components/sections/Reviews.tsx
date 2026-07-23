import { motion } from "framer-motion"

import {
  fadeUp,
  staggerContainer,
} from "../../animations/motionVariants"
import { reviewsData } from "../../data/siteData"
import { ReviewsCarousel } from "../reviews/ReviewsCarousel"
import { AnimatedSection } from "../ui/AnimatedSection"

export function Reviews() {
  return (
    <AnimatedSection
      id={reviewsData.sectionId}
      className="bg-white"
      variants={staggerContainer}
      amount={0.12}
    >
      <div
        className={[
          "mx-auto max-w-[1820px]",
          "px-6 py-20 sm:px-8",
          "md:py-24 lg:px-12 lg:py-28",
        ].join(" ")}
      >
        <motion.h2
          variants={fadeUp}
          className={[
            "text-center font-playfair",
            "text-4xl font-bold text-maturana-navy",
            "sm:text-5xl",
          ].join(" ")}
        >
          {reviewsData.title}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-12 md:mt-14"
        >
          <ReviewsCarousel
            reviews={reviewsData.reviews}
            quoteIcon={reviewsData.quoteIcon}
          />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}