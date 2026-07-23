import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import { ReviewCard } from "./ReviewCard"

type Review = {
  id: string
  text: string
  author: string
}

type ReviewsCarouselProps = {
  reviews: Review[]
  quoteIcon: string
}

const CAROUSEL_INTERVAL = 6500

export function ReviewsCarousel({
  reviews,
  quoteIcon,
}: ReviewsCarouselProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 640px)")

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1

  const visibleReviews = useMemo(() => {
    return Array.from(
      {
        length: Math.min(visibleCount, reviews.length),
      },
      (_, offset) => {
        return reviews[
          (currentIndex + offset) % reviews.length
        ]
      },
    )
  }, [currentIndex, reviews, visibleCount])

  useEffect(() => {
    if (isPaused || reviews.length <= visibleCount) {
      return
    }

    const intervalId = window.setInterval(() => {
      setDirection(1)

      setCurrentIndex((index) => {
        return (index + 1) % reviews.length
      })
    }, CAROUSEL_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [isPaused, reviews.length, visibleCount])

  function showPreviousReview() {
    setDirection(-1)

    setCurrentIndex((index) => {
      return (index - 1 + reviews.length) % reviews.length
    })
  }

  function showNextReview() {
    setDirection(1)

    setCurrentIndex((index) => {
      return (index + 1) % reviews.length
    })
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden px-1 py-3">
        <motion.div
          layout
          className={[
            "grid gap-5",
            visibleCount === 1
              ? "grid-cols-1"
              : visibleCount === 2
                ? "grid-cols-2"
                : "grid-cols-3",
          ].join(" ")}
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
          >
            {visibleReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 70 : -70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -70 : 70,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="min-w-0"
              >
                <ReviewCard
                  review={review}
                  quoteIcon={quoteIcon}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {reviews.length > visibleCount && (
        <>
          <button
            type="button"
            onClick={showPreviousReview}
            aria-label="Ver reseñas anteriores"
            className={[
              "absolute left-0 top-1/2 z-20",
              "-translate-x-1/2 -translate-y-1/2",
              "grid h-10 w-10 place-items-center rounded-full",
              "border border-maturana-ochre/70",
              "bg-white text-maturana-navy",
              "shadow-md transition duration-300",
              "hover:bg-maturana-ochre",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-maturana-navy",
              "max-sm:-left-5 max-sm:translate-x-0",
            ].join(" ")}
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            onClick={showNextReview}
            aria-label="Ver siguientes reseñas"
            className={[
              "absolute right-5 top-1/2 z-20",
              "translate-x-1/2 -translate-y-1/2",
              "grid h-10 w-10 place-items-center rounded-full",
              "border border-maturana-ochre/70",
              "bg-white text-maturana-navy",
              "shadow-md transition duration-300",
              "hover:bg-maturana-ochre",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-maturana-navy",
              "max-sm:-right-5 max-sm:translate-x-0",
            ].join(" ")}
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      <div
        className="mt-7 flex justify-center gap-2"
        aria-label="Posición actual del carrusel"
      >
        {reviews.map((review, index) => (
          <button
            key={review.id}
            type="button"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            aria-label={`Mostrar reseña de ${review.author}`}
            className={[
              "h-1.5 rounded-full transition-all duration-500",
              index === currentIndex
                ? "w-7 bg-maturana-ochre"
                : "w-2 bg-maturana-navy/25 hover:bg-maturana-navy/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}