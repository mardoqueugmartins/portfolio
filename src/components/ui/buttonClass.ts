export type Variant = 'cta' | 'primary' | 'secondary' | 'light' | 'outline-light'

const variants: Record<Variant, string> = {
  // Verde da paleta com texto escuro: branco sobre #45AE48 não passa no contraste mínimo
  cta: 'bg-gradient-cta text-ink shadow-[0_10px_30px_-10px_rgb(69_174_72/0.7)] hover:brightness-110',
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-primary/25 bg-white text-primary hover:border-primary',
  light: 'bg-white text-ink hover:bg-ice',
  'outline-light': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
}

export const buttonClass = (variant: Variant = 'primary') =>
  `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[0.95rem] font-semibold transition-[background-color,border-color,filter,color] duration-200 ${variants[variant]}`
