import Footer from "./components/layout/Footer"
import { Navbar } from "./components/layout/Navbar"
import { About } from "./components/sections/About"
import { Contact } from "./components/sections/Contact"
import { Hero } from "./components/sections/Hero"
import { Identity } from "./components/sections/Identity"
import { Introduction } from "./components/sections/Introduction"
import NeedHelp from "./components/sections/NeedHelp"
import { PracticeAreas } from "./components/sections/PracticeAreas"
import { Reviews } from "./components/sections/Reviews"
import { Team } from "./components/sections/Team"


function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Introduction/>
        <About/>
        <Identity/>
        <NeedHelp/>
        <PracticeAreas/>
        <Team/>
        <Reviews/>
        <Contact/>

        <Footer/>

      </main>
    </>
  )
}

export default App