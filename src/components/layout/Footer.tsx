
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-maturana-beige text-maturana-navy">
      {/* Logo principal */}
      <div className="flex justify-center lg:py-8 py-5">
        <a href="#inicio" aria-label="Volver al inicio">
          <img
            className="lg:h-20 h-16 w-auto"
            src="/logo_navbar.png"
            alt="Logo Estudio Maturana-musri & Asociados"
          />
        </a>
      </div>

      {/* Línea divisoria */}
      <div className="mx-auto w-11/12 border-t border-maturana-ochre" />

      {/* Información inferior */}
      <div className="mx-auto flex w-11/12 flex-col items-center justify-between gap-5 py-6 text-center text-xs lg:text-sm text-white/90 lg:flex-row lg:text-left">
        <div className="flex gap-3 flex-col lg:flex-row text-maturana-navy">
          <p className="font-medium">
            © {currentYear} Maturana-musri & Asociados Mendoza.
          </p>

          <p className=" text-maturana-navy">
            Todos los derechos reservados.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 lg:items-end">
          <p className="text-maturana-navy">
            Desarrollado por{" "}
          </p>

          <a
            href="https://linktr.ee/viralmk?fbclid=PAZXh0bgNhZW0CMTEAAaaDt0GRMewRaznFlWYwXoXmAf8DphiWiZ3Cdi0Kn-YCgwNpNZ7Lz0743UM_aem_Vzxh6uCC7RpCbm0sA08zgA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Viral Marketing"
          >
            <img
              className="lg:h-8 h-7 w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
              src="/Marca viral-03.png"
              alt="Logo Viral Marketing"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer