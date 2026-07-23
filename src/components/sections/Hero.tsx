import { useState } from "react"
import { motion } from "framer-motion"

import { heroData } from "../../data/siteData"
import { useMediaQuery } from "../../hooks/useMediaQuery"

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [readyVideoUrl, setReadyVideoUrl] = useState<string | null>(null)

  const videoUrl = isMobile
    ? heroData.mobileVideoUrl
    : heroData.desktopVideoUrl

  const posterUrl = isMobile
    ? heroData.mobilePosterUrl
    : heroData.desktopPosterUrl

  const isVideoReady = readyVideoUrl === videoUrl

  return (
    <section
      id="inicio"
      aria-label="Presentación de Maturana Musri y Asociados"
      className={[
        "relative h-[100svh]",
        "overflow-hidden bg-maturana-navy",
        "pt-[var(--navbar-height)]",
      ].join(" ")}
    >
      <div className="relative h-[calc(100svh-var(--navbar-height))] w-full overflow-hidden">
        <img
          key={posterUrl}
          src={posterUrl}
          alt=""
          aria-hidden="true"
          className={[
            "absolute inset-0 h-full w-full object-cover object-center",
            "transition-opacity duration-1000",
            isVideoReady ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />

        <motion.video
          key={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl}
          onCanPlay={() => {
            setReadyVideoUrl(videoUrl)
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isVideoReady ? 1 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={videoUrl} />

          Tu navegador no puede reproducir este video.
        </motion.video>
      </div>
    </section>
  )
}