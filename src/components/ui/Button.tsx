import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { isPendente } from '../../data/site'
import { Pending } from './Pending'
import { buttonClass, type Variant } from './buttonClass'

type ButtonLinkProps = {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>

/** Link com cara de botão. Rotas internas usam o router; URLs externas abrem em nova aba. */
export function ButtonLink({ href, variant = 'primary', children, className = '', ...rest }: ButtonLinkProps) {
  const cls = `${buttonClass(variant)} ${className}`

  if (isPendente(href)) {
    return (
      <span className={`${cls} cursor-not-allowed opacity-70`} aria-disabled="true">
        {children} <Pending />
      </span>
    )
  }

  if (href.startsWith('/') && !href.endsWith('.pdf')) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    )
  }

  const external = href.startsWith('http')
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
