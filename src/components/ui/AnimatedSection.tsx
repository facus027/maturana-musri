import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps, Variants } from "framer-motion"

import { fadeUp } from "../../animations/motionVariants"

type AnimatedSectionProps = {
  children: ReactNode
  variants?: Variants
  delay?: number
  amount?: number
  once?: boolean
} & Omit<HTMLMotionProps<"section">, "children">

export function AnimatedSection({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
  amount = 0.2,
  once = true,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      custom={delay}
      {...props}
    >
      {children}
    </motion.section>
  )
}