import { motion } from "framer-motion"
import { AnimatedSection } from "../ui/AnimatedSection"
import { fadeUp, staggerContainer } from "../../animations/motionVariants"

export default function NeedHelp() {
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
         ¿Necesitas ayuda?
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="mt-7 max-w-[1250px] text-justify"
        >
          
            <motion.p
              variants={fadeUp}
              className={[
                "font-medium text-base ",
                "text-maturana-navy/90",
                "sm:text-2xl ",
              ].join(" ")}
            >
              Acompañamos principalmente a quienes atraviesan situaciones familiares difíciles: divorcios, sucesiones, alimentos, comunicación y
              contacto, el cuidado de sus hijos y disputas patrimoniales, violencia intrafamiliar e infantil, y procesos referidos al Derecho de Familia
              en general.
            </motion.p>

             <motion.p
              variants={fadeUp}
              className={[
                "font-medium text-base ",
                "text-maturana-navy/90",
                "sm:text-2xl ",
              ].join(" ")}
            >
              Sabemos que estos procesos impactan en la vida personal, emocional y económica, por eso ofrecemos contención real y soluciones
              prácticas, para que cada decisión sea consciente y segura.
              Nos acercamos a nuevas generaciones que valoran una atención cercana, simple y transparente
            </motion.p>

               <motion.p
              variants={fadeUp}
              className={[
                "font-semibold text-base ",
                "text-maturana-navy/90",
                "sm:text-2xl ",
              ].join(" ")}
            >
              Nuestro propósito es brindar la posibilidad de elegir un abogado sin que ello signifique generar miedo ni desconfianza:
              nos comunicamos en forma clara, acompañamos y resolvemos.
            </motion.p>
         
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
