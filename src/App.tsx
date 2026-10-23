import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

// Páginas secundárias carregam sob demanda para a home ficar leve
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const TermsOfUse = lazy(() => import('./pages/legal/TermsOfUse'))
const Lgpd = lazy(() => import('./pages/legal/Lgpd'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projetos/:slug" element={<CaseStudy />} />
          <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="termos-de-uso" element={<TermsOfUse />} />
          <Route path="lgpd" element={<Lgpd />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
