import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

// Páginas secundárias carregam sob demanda para a home ficar leve
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projetos/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
