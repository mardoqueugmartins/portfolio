import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Recruiters } from '../components/sections/Recruiters'
import { Services } from '../components/sections/Services'
import { Stats } from '../components/sections/Stats'
import { Timeline } from '../components/sections/Timeline'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <Stats />
      <Projects />
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
