import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import { TeamCard } from "./TeamCard"

type TeamMember = {
  id: string
  name: string
  description: string
  photos: string[]
}

type TeamCarouselProps = {
  members: TeamMember[]
}

const CAROUSEL_INTERVAL = 6200

export function TeamCarousel({
  members,
}: TeamCarouselProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 640px)")

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1

  const visibleMembers = useMemo(() => {
    return Array.from(
      {
        length: Math.min(visibleCount, members.length),
      },
      (_, offset) => {
        const memberIndex =
          (currentIndex + offset) % members.length

        return members[memberIndex]
      },
    )
  }, [currentIndex, members, visibleCount])

  useEffect(() => {
    if (isPaused || members.length <= visibleCount) {
      return
    }

    const intervalId = window.setInterval(() => {
      setDirection(1)

      setCurrentIndex((index) => {
        return (index + 1) % members.length
      })
    }, CAROUSEL_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [isPaused, members.length, visibleCount])

  function showPreviousMember() {
    setDirection(-1)

    setCurrentIndex((index) => {
      return (index - 1 + members.length) % members.length
    })
  }

  function showNextMember() {
    setDirection(1)

    setCurrentIndex((index) => {
      return (index + 1) % members.length
    })
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          layout
          className={[
            "grid gap-7",
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
            {visibleMembers.map((member) => (
              <motion.div
                key={member.id}
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
                <TeamCard member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Controles */}
      {members.length > visibleCount && (
        <>
          <button
            type="button"
            onClick={showPreviousMember}
            aria-label="Ver integrantes anteriores"
            className={[
              "absolute left-0 top-[38%] z-20",
              "-translate-x-1/2 -translate-y-1/2",
              "grid h-10 w-10 place-items-center rounded-full",
              "border border-maturana-ochre/70",
              "bg-maturana-navy/90 text-maturana-ochre",
              "transition duration-300",
              "hover:bg-maturana-ochre hover:text-maturana-navy",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-white",
              "max-sm:left-3 max-sm:translate-x-0",
            ].join(" ")}
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            onClick={showNextMember}
            aria-label="Ver siguientes integrantes"
            className={[
              "absolute right-0 top-[38%] z-20",
              "translate-x-1/2 -translate-y-1/2",
              "grid h-10 w-10 place-items-center rounded-full",
              "border border-maturana-ochre/70",
              "bg-maturana-navy/90 text-maturana-ochre",
              "transition duration-300",
              "hover:bg-maturana-ochre hover:text-maturana-navy",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-white",
              "max-sm:right-3 max-sm:translate-x-0",
            ].join(" ")}
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      {/* Indicadores de integrantes */}
      <div
        className="mt-8 flex justify-center gap-2"
        aria-label="Posición actual del carrusel"
      >
        {members.map((member, index) => (
          <button
            key={member.id}
            type="button"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            aria-label={`Mostrar a ${member.name}`}
            className={[
              "h-1.5 rounded-full transition-all duration-500",
              index === currentIndex
                ? "w-7 bg-maturana-ochre"
                : "w-2 bg-white/35 hover:bg-white/65",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}