import { lazy, Suspense } from 'react'
import { Hero } from '../components/sections/Hero'
import { Stats } from '../components/sections/Stats'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const HomeBelowFold = lazy(() => import('./HomeBelowFold'))

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <Stats />
      <Suspense fallback={<div className="min-h-screen bg-ink" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  )
}
