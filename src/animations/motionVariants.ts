import type { Variants } from "framer-motion"

const elegantEase = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: elegantEase,
    },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
}