import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type TeamMember = {
  id: string
  name: string
  description: string
  photos: string[]
}

type TeamCardProps = {
  member: TeamMember
}

const PHOTO_CHANGE_INTERVAL = 4200

export function TeamCard({ member }: TeamCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || member.photos.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      setCurrentPhotoIndex((currentIndex) => {
        return (currentIndex + 1) % member.photos.length
      })
    }, PHOTO_CHANGE_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [isPaused, member.photos.length])

  return (
    <article
      className="group flex min-w-0 flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fotografía */}
      <div
        className={[
          "relative aspect-[4/5] overflow-hidden",
          "bg-white/5",
        ].join(" ")}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={`${member.id}-${currentPhotoIndex}`}
            src={member.photos[currentPhotoIndex]}
            alt={member.name}
            loading="lazy"
            initial={{
              opacity: 0,
              scale: 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.99,
            }}
            transition={{
              opacity: {
                duration: 0.7,
                ease: "easeInOut",
              },
              scale: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className={[
              "absolute inset-0 h-full w-full",
              "object-cover object-top",
            ].join(" ")}
          />
        </AnimatePresence>

        {/* Indicadores de fotografías */}
        {member.photos.length > 1 && (
          <div
            className={[
              "absolute bottom-3 left-1/2 z-10",
              "flex -translate-x-1/2 gap-1.5",
            ].join(" ")}
            aria-hidden="true"
          >
            {member.photos.map((photo, index) => (
              <span
                key={photo}
                className={[
                  "h-1 rounded-full transition-all duration-500",
                  index === currentPhotoIndex
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/55",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Información */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
        <h3
          className={[
            "font-playfair text-xl font-semibold",
            "leading-tight text-maturana-ochre",
            "transition-colors duration-300",
            "group-hover:text-white",
          ].join(" ")}
        >
          {member.name}
        </h3>

        <p
          className={[
            "mx-auto mt-2 max-w-[320px]",
            "font-lato text-xs leading-[1.55]",
            "text-white/85 sm:text-sm",
          ].join(" ")}
        >
          {member.description}
        </p>
      </div>
    </article>
  )
}