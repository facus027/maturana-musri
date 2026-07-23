import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import {
  heroData,
  navigationLinks,
} from "../../data/siteData"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "fixed inset-x-0 top-0 z-50",
        "h-[var(--navbar-height)]",
        "border-b transition-all duration-500",
        isScrolled
          ? "border-maturana-navy/10 bg-maturana-beige/95 shadow-[0_8px_30px_rgba(15,41,64,0.08)] backdrop-blur-md"
          : "border-transparent bg-maturana-beige",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          onClick={closeMenu}
          className="relative z-50 flex items-center"
        >
          <img
            src={heroData.logoNavbar}
            alt={heroData.logoAlt}
            className="h-auto w-[150px] object-contain sm:w-[320px]"
          />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden md:block mr-36"
        >
          <ul className="flex items-center gap-8 lg:gap-24">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    "relative py-2",
                    "font-lato text-xs lg:text-xl font-extrabold uppercase tracking-[0.04em]",
                    "text-maturana-navy",
                    "transition-colors duration-300",
                    "after:absolute after:bottom-0 after:left-0",
                    "after:h-px after:w-0",
                    "after:bg-maturana-ochre",
                    "after:transition-all after:duration-300",
                    "hover:text-maturana-ochre hover:after:w-full",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-maturana-ochre",
                    "focus-visible:ring-offset-4",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={
            isMenuOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setIsMenuOpen((currentValue) => !currentValue)
          }}
          className={[
            "relative z-50",
            "flex h-10 w-10 items-center justify-center",
            "text-maturana-navy md:hidden mr-1",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-maturana-ochre",
          ].join(" ")}
        >
          {isMenuOpen ? (
            <X size={26} strokeWidth={1.7} />
          ) : (
            <Menu size={28} strokeWidth={1.7} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navegación móvil"
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "absolute left-0 top-full w-full",
              "border-t border-maturana-navy/10",
              "bg-maturana-beige",
              "shadow-[0_18px_40px_rgba(15,41,64,0.12)]",
              "backdrop-blur-md md:hidden",
            ].join(" ")}
          >
            <ul className="flex flex-col px-6 py-5">
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{
                    opacity: 0,
                    x: -12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                  className="border-b border-maturana-navy/10 last:border-b-0"
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={[
                      "block py-4",
                      "font-lato text-sm font-bold uppercase",
                      "tracking-[0.08em]",
                      "text-maturana-navy",
                      "transition-colors duration-300",
                      "hover:text-maturana-ochre",
                    ].join(" ")}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}