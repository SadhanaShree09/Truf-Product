import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export function ClayButton({
  active = false,
  className,
  children,
  icon: Icon,
  label,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.98 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-3 text-sm font-semibold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5',
        active
          ? 'border-[#39FF14]/50 bg-[linear-gradient(180deg,rgba(57,255,20,0.28),rgba(57,255,20,0.14))] text-white shadow-[0_16px_32px_rgba(57,255,20,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]'
          : 'border-white/8 bg-[linear-gradient(180deg,rgba(34,43,56,0.98),rgba(23,29,39,0.98))] text-[#DCE3EA] shadow-[0_14px_28px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/12 hover:text-white',
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,255,77,0.16),transparent_60%)]" />
      </span>
      {Icon ? <Icon className="relative z-10 h-4 w-4" aria-hidden="true" /> : null}
      <span className="relative z-10">{label ?? children}</span>
    </motion.button>
  )
}