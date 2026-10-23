import { About } from '../components/sections/About'
import { BuildShowcase } from '../components/sections/BuildShowcase'
import { Contact } from '../components/sections/Contact'
import { Faq } from '../components/sections/Faq'
import { Projects } from '../components/sections/Projects'
import { Recruiters } from '../components/sections/Recruiters'
import { Services } from '../components/sections/Services'
import { Timeline } from '../components/sections/Timeline'
import { VelocityMarquee } from '../components/ui/VelocityMarquee'

/** Seções abaixo da dobra: carregam em um chunk separado, depois do hero. */
export default function HomeBelowFold() {
  return (
    <>
      <BuildShowcase />
      <Projects />
      <VelocityMarquee text="Design, código e conversão" />
      <Services />
      {/* <Testimonials /> volta quando houver ao menos dois depoimentos reais (src/data/content.ts) */}
      <Recruiters />
      <Timeline />
      <About />
      <Faq />
      <Contact />
    </>
  )
}
