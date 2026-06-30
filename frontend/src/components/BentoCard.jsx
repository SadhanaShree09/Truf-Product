import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export function BentoCard({
  title,
  eyebrow,
  subtitle,
  icon: Icon,
  action,
  className,
  children,
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] p-4 shadow-[0_22px_44px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,255,20,0.07),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(0,194,255,0.08),transparent_28%)]" />
      {(title || eyebrow || subtitle || action) && (
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="space-y-1">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7ef56a]">
                {eyebrow}
              </p>
            ) : null}
            <div className="flex items-center gap-3">
              {Icon ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#39FF14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : null}
              <div>
                {title ? (
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">
                    {title}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-1 text-sm leading-6 text-[#B8C1CC]">{subtitle}</p>
                ) : null}
              </div>
            </div>
          </div>
          {action ? <div className="relative z-10">{action}</div> : null}
        </div>
      )}

      <div className={cn('relative z-10', title || eyebrow || subtitle || action ? 'mt-5' : '')}>
        {children}
      </div>
    </motion.article>
  )
}