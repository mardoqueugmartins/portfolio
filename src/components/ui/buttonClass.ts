export type Variant = 'primary' | 'secondary' | 'on-dark' | 'outline-on-dark'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-primary/30 bg-white text-primary hover:border-primary hover:bg-surface-blue/40',
  'on-dark': 'bg-white text-primary-dark hover:bg-surface-blue',
  'outline-on-dark': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
}

export const buttonClass = (variant: Variant = 'primary') =>
  `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-display text-[0.95rem] font-semibold transition-colors duration-200 ${variants[variant]}`
