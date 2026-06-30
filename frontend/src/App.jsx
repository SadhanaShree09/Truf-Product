import { useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeIndianRupee,
  Bell,
  ChevronDown,
  Clock3,
  CloudSun,
  Droplets,
  Heart,
  MapPin,
  MessageSquareQuote,
  MoonStar,
  Navigation,
  ParkingCircle,
  Route,
  Search,
  Sparkles,
  Star,
  SunMedium,
  UtensilsCrossed,
  Wind,
} from 'lucide-react'
import { BentoCard } from './components/BentoCard'
import { ClayButton } from './components/ClayButton'
import {
  amenities,
  bookingSummaryFields,
  footerLinks,
  galleryImages,
  galleryThumbs,
  heroImage,
  locationStats,
  mapFacts,
  nearbyRestaurants,
  offers,
  parkingInfo,
  pricingRows,
  quickStats,
  reviews,
  slotSections,
  sportFilters,
  turfDescription,
  weatherMetrics,
} from './data/siteContent'

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [selectedSport, setSelectedSport] = useState('Football')
  const [selectedSlot, setSelectedSlot] = useState('06:00 PM')

  const allSlots = slotSections.flatMap((section) => section.slots)
  const selectedSlotData = allSlots.find((slot) => slot.time === selectedSlot) ?? allSlots[0]

  const summary = useMemo(() => {
    const base = selectedSlotData?.price ?? 1200
    const tax = Math.round(base * 0.1)
    const discount = selectedSlotData?.featured ? 140 : 0

    return {
      base,
      tax,
      discount,
      total: base + tax - discount,
    }
  }, [selectedSlotData])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,255,20,0.12),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(0,194,255,0.12),transparent_22%),radial-gradient(circle_at_bottom,rgba(91,255,77,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

      <Header />

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <motion.section
          variants={pageVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#7ef56a]">
                Premium Sports Booking
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Book a turf that feels like a premium product, not a form.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#B8C1CC] sm:text-base">
                {turfDescription}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:min-w-[340px]">
              {quickStats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] p-4 shadow-[0_18px_36px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    <Icon className="h-4 w-4 text-[#39FF14]" aria-hidden="true" />
                    <p className="mt-3 text-lg font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-[#B8C1CC]">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BentoCard className="border-white/10 bg-[linear-gradient(180deg,rgba(18,23,31,0.96),rgba(15,19,26,0.98))] p-3 sm:p-4">
              <LayoutGroup>
                <div className="flex flex-wrap gap-3">
                  {sportFilters.map((sport) => {
                    const Icon = sport.icon
                    const isActive = selectedSport === sport.name

                    return (
                      <ClayButton
                        key={sport.name}
                        active={isActive}
                        icon={Icon}
                        onClick={() => setSelectedSport(sport.name)}
                        aria-pressed={isActive}
                        className="min-w-[132px] justify-start px-5 py-3 text-sm"
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="sport-pill-glow"
                            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]"
                          />
                        ) : null}
                        <span className="relative z-10">{sport.name}</span>
                      </ClayButton>
                    )
                  })}
                </div>
              </LayoutGroup>
            </BentoCard>
          </motion.div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
          >
            <BentoCard className="h-full p-0">
              <div className="relative overflow-hidden rounded-[28px]">
                <img
                  src={heroImage}
                  alt="GreenField Arena turf illuminated at night"
                  className="h-[360px] w-full object-cover sm:h-[480px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,20,0.02)_0%,rgba(11,15,20,0.2)_40%,rgba(11,15,20,0.86)_100%)]" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(15,19,26,0.84)] px-3 py-2 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(0,0,0,0.35)] sm:left-5 sm:top-5">
                  <Star className="h-4 w-4 fill-[#39FF14] text-[#39FF14]" aria-hidden="true" />
                  4.8
                  <span className="text-[#B8C1CC]">({selectedSport})</span>
                </div>
                <button
                  type="button"
                  aria-label="Add turf to favourites"
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[rgba(15,19,26,0.84)] text-white shadow-[0_16px_32px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:text-[#39FF14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                >
                  <Heart className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <div className="max-w-3xl space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7ef56a]">
                        {selectedSport} turf
                      </p>
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                        GreenField Arena
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#B8C1CC]">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#39FF14]" aria-hidden="true" />
                          HSR Layout, Bengaluru
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>2.4 km away</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs font-medium text-[#E7EDF4] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <p className="max-w-2xl text-sm leading-7 text-[#D8E0E8] sm:text-base">
                      {turfDescription}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <ClayButton icon={Navigation}>Get Directions</ClayButton>
                      <ClayButton icon={Sparkles} active>
                        View Amenities
                      </ClayButton>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.24 }}
            >
              <BentoCard
                title="Available Time Slots"
                subtitle="Tap a clay button to update the booking summary in real time."
                icon={Clock3}
                action={
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs font-semibold text-[#7ef56a]"
                  >
                    Today, 29 May <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                }
              >
                <LayoutGroup>
                  <div className="space-y-4">
                    {slotSections.map((section) => (
                      <div key={section.label} className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7f8b97]">
                          {section.label}
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {section.slots.map((slot) => {
                            const isSelected = selectedSlot === slot.time
                            const isDisabled = slot.status !== 'available'

                            return (
                              <motion.button
                                key={slot.time}
                                type="button"
                                disabled={isDisabled}
                                aria-pressed={isSelected}
                                onClick={() => {
                                  if (!isDisabled) {
                                    setSelectedSlot(slot.time)
                                  }
                                }}
                                className={
                                  `relative flex min-h-[78px] flex-col items-center justify-center rounded-[22px] border px-3 py-3 text-center text-sm font-semibold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14] ` +
                                  (isDisabled
                                    ? 'border-white/6 bg-[rgba(255,255,255,0.04)] text-[#6D7580]'
                                    : isSelected
                                      ? 'border-[#39FF14]/55 bg-[linear-gradient(180deg,rgba(57,255,20,0.26),rgba(57,255,20,0.12))] text-white shadow-[0_18px_34px_rgba(57,255,20,0.18),inset_0_1px_0_rgba(255,255,255,0.16)]'
                                      : 'border-white/8 bg-[linear-gradient(180deg,rgba(34,43,56,0.98),rgba(23,29,39,0.98))] text-[#E7EDF4] shadow-[0_14px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/12 hover:text-white')
                                }
                              >
                                {isSelected ? (
                                  <motion.span
                                    layoutId="selected-slot-glow"
                                    className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(91,255,77,0.35),transparent_64%)]"
                                  />
                                ) : null}
                                <span className="relative z-10">{slot.time}</span>
                                <span
                                  className={
                                    `relative z-10 mt-1 text-xs ` +
                                    (isDisabled
                                      ? 'text-[#6D7580]'
                                      : isSelected
                                        ? 'text-[#E6FFE4]'
                                        : 'text-[#B8C1CC]')
                                  }
                                >
                                  {isDisabled ? 'Booked' : formatMoney(slot.price)}
                                </span>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </LayoutGroup>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#B8C1CC]">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#39FF14]" /> Available
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" /> Booked
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" /> Maintenance
                  </span>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.24 }}
            >
              <BentoCard title="Booking Summary" icon={BadgeIndianRupee} className="h-full">
                <div className="space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {bookingSummaryFields.map((field) => {
                      const Icon = field.icon

                      return (
                        <div
                          key={field.label}
                          className="rounded-[20px] border border-white/8 bg-white/4 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                        >
                          <p className="text-xs uppercase tracking-[0.2em] text-[#7f8b97]">{field.label}</p>
                          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                            {Icon ? <Icon className="h-4 w-4 text-[#39FF14]" aria-hidden="true" /> : null}
                            <span>{field.label === 'Sport' ? selectedSport : field.value}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3 rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-4">
                    <SummaryRow label="Selected Time" value={selectedSlotData?.time ?? selectedSlot} />
                    <SummaryRow label="Price Details" value={formatMoney(summary.base)} />
                    <SummaryRow label="Taxes & Fees" value={formatMoney(summary.tax)} />
                    <SummaryRow
                      label="Discount"
                      value={`-${formatMoney(summary.discount)}`}
                      valueClassName="text-[#7ef56a]"
                    />
                    <div className="border-t border-white/8 pt-4">
                      <SummaryRow
                        label="Total Amount"
                        value={formatMoney(summary.total)}
                        strong
                        valueClassName="text-[#39FF14] text-2xl"
                      />
                    </div>
                  </div>

                  <ClayButton className="w-full justify-between py-4 text-base" active>
                    Book Now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ClayButton>
                </div>
              </BentoCard>
            </motion.div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-12">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-6"
          >
            <BentoCard
              title="Gallery"
              subtitle="Hover each frame for a subtle zoom and depth shift."
              icon={Sparkles}
              className="h-full"
            >
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border border-white/8">
                  <motion.img
                    src={galleryImages[0]}
                    alt="Turf gallery preview"
                    className="h-64 w-full object-cover sm:h-72"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {galleryThumbs.map((image, index) => (
                    <motion.div
                      key={image}
                      className="overflow-hidden rounded-[18px] border border-white/8"
                      whileHover={{ y: -3 }}
                    >
                      <motion.img
                        src={image}
                        alt={`Gallery thumbnail ${index + 1}`}
                        className="h-24 w-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-3"
          >
            <BentoCard title="Map Card" subtitle="Dark map styling with a green location beacon." icon={MapPin} className="h-full">
              <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,12,16,0.98),rgba(20,26,34,0.98))] p-4">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,194,255,0.08),transparent_30%),linear-gradient(45deg,rgba(57,255,20,0.06),transparent_28%)]" />
                <div className="relative h-56 rounded-[20px] bg-[radial-gradient(circle_at_50%_45%,rgba(57,255,20,0.1),transparent_12%),linear-gradient(180deg,rgba(25,31,41,1),rgba(14,18,24,1))]">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
                  <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(57,255,20,0.15)] shadow-[0_0_0_18px_rgba(57,255,20,0.08)]">
                      <MapPin className="h-6 w-6 text-[#39FF14]" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 rounded-full border border-white/8 bg-[rgba(255,255,255,0.04)] px-3 py-2 text-xs font-semibold text-[#E7EDF4]">
                    Green route locked
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {mapFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center justify-between border-b border-white/6 pb-2 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-[#B8C1CC]">{fact.label}</span>
                    <span className="font-semibold text-white">{fact.value}</span>
                  </div>
                ))}
              </div>

              <ClayButton className="mt-4 w-full justify-between">
                Get Directions
                <Navigation className="h-4 w-4" aria-hidden="true" />
              </ClayButton>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-3"
          >
            <BentoCard title="Pricing Card" subtitle="Peak hours and weekend pricing in a compact view." icon={BadgeIndianRupee} className="h-full">
              <div className="space-y-3">
                {pricingRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/4 px-4 py-3">
                    <span className="text-sm text-[#DCE3EA]">{row.label}</span>
                    <span className="text-sm font-semibold text-white">{formatMoney(row.price)}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-[#9BA5B0]">
                Extra charge applies after 10 PM for floodlight coverage and late security staffing.
              </p>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-4"
          >
            <BentoCard title="Weather" subtitle="Today's conditions and the best time to play." icon={CloudSun} className="h-full">
              <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(25,31,41,0.98),rgba(14,18,24,0.98))] p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-[#7f8b97]">Tonight</p>
                    <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-white">29°C</p>
                    <p className="mt-1 text-sm text-[#B8C1CC]">Clear sky, excellent visibility</p>
                  </div>
                  <MoonStar className="h-10 w-10 text-[#39FF14]" aria-hidden="true" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {weatherMetrics.map((metric) => {
                    const Icon = metric.label === 'Humidity' ? Droplets : metric.label === 'Wind' ? Wind : SunMedium

                    return (
                      <div key={metric.label} className="rounded-[18px] border border-white/8 bg-white/4 p-3 text-center">
                        <Icon className="mx-auto h-4 w-4 text-[#39FF14]" aria-hidden="true" />
                        <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                        <p className="text-xs text-[#B8C1CC]">{metric.label}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 rounded-[18px] border border-[#39FF14]/20 bg-[rgba(57,255,20,0.08)] p-4 text-sm text-[#E7FFE3]">
                  Best time to play: <span className="font-semibold text-white">6:00 PM - 8:00 PM</span>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-5"
          >
            <BentoCard title="Offers" subtitle="A conversion-first promo block with a football illustration." icon={Sparkles} className="h-full overflow-hidden">
              <div className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(135deg,rgba(57,255,20,0.22),rgba(19,26,34,0.98)_48%)] p-5">
                <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.3),transparent_70%)] blur-2xl" />
                <div className="absolute right-4 top-4 h-32 w-32 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(0,194,255,0.22),transparent_24%),radial-gradient(circle_at_center,#1f2a36,rgba(11,15,20,0.2))] shadow-[inset_0_0_0_10px_rgba(255,255,255,0.02)]" />
                <div className="relative max-w-md space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7ef56a]">Team deal</p>
                  <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">{offers.title}</h3>
                  <p className="text-sm leading-7 text-[#E7EDF4]">{offers.copy}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <ClayButton active className="px-5">
                      Use Coupon
                    </ClayButton>
                    <span className="rounded-full border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                      {offers.coupon}
                    </span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-3"
          >
            <BentoCard title="Reviews" subtitle="Recent player feedback with rating and commentary." icon={MessageSquareQuote} className="h-full">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.name} className="rounded-[22px] border border-white/8 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(57,255,20,0.28),rgba(0,194,255,0.14))] text-sm font-semibold text-white">
                        {review.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-semibold text-white">{review.name}</p>
                            <p className="text-xs text-[#B8C1CC]">{review.role}</p>
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-xs font-semibold text-[#7ef56a]">
                            <Star className="h-3 w-3 fill-[#7ef56a] text-[#7ef56a]" aria-hidden="true" />
                            {review.rating}
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[#DCE3EA]">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-4"
          >
            <BentoCard title="Nearby Restaurants" subtitle="Good fuel stops before and after your game." icon={UtensilsCrossed} className="h-full">
              <div className="space-y-3">
                {nearbyRestaurants.map((restaurant) => (
                  <div key={restaurant.name} className="rounded-[20px] border border-white/8 bg-white/4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{restaurant.name}</p>
                        <p className="mt-1 text-sm text-[#B8C1CC]">{restaurant.cuisine}</p>
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-xs font-semibold text-[#7ef56a]">
                        {restaurant.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-4"
          >
            <BentoCard title="Parking Info" subtitle="Capacity and a quick at-a-glance price breakdown." icon={ParkingCircle} className="h-full">
              <div className="space-y-3">
                {parkingInfo.map((info) => (
                  <div key={info.label} className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/4 px-4 py-3">
                    <span className="text-sm text-[#B8C1CC]">{info.label}</span>
                    <span className="text-sm font-semibold text-white">{info.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[20px] border border-[#39FF14]/18 bg-[rgba(57,255,20,0.08)] p-4 text-sm text-[#E7FFE3]">
                Parking spots are reserved for active bookings 15 minutes before kickoff.
              </div>
            </BentoCard>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-4"
          >
            <BentoCard title="Location Snapshot" subtitle="Useful details for players arriving on match day." icon={Route} className="h-full">
              <div className="space-y-3">
                {locationStats.map((stat) => {
                  const Icon = stat.icon

                  return (
                    <div key={stat.label} className="flex items-center gap-3 rounded-[20px] border border-white/8 bg-white/4 px-4 py-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(57,255,20,0.1)] text-[#39FF14]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{stat.label}</p>
                        <p className="text-xs text-[#B8C1CC]">{stat.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </BentoCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(11,15,20,0.95)]"
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(57,255,20,0.22),rgba(26,34,45,0.96))] text-lg font-black text-[#39FF14] shadow-[0_16px_30px_rgba(57,255,20,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]">
            T
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7ef56a]">Turf Play</p>
            <p className="text-sm text-[#B8C1CC]">Premium sports booking</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center gap-3 lg:flex">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] px-4 py-3 shadow-[0_16px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <Search className="h-4 w-4 text-[#B8C1CC]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search turf, location, or sport..."
              aria-label="Search turf, location, or sport"
              className="w-full bg-transparent text-sm text-white placeholder:text-[#7f8b97] outline-none"
            />
          </div>

          <ClayButton icon={MapPin} className="min-w-[170px]">
            Bangalore
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </ClayButton>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] text-white shadow-[0_16px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:-translate-y-0.5 hover:text-[#39FF14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] px-3 py-2 pr-4 text-left shadow-[0_16px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
            aria-label="Open profile menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(57,255,20,0.2),rgba(0,194,255,0.14))] text-sm font-semibold text-white">
              PS
            </div>
            <span className="hidden text-sm font-semibold text-white sm:inline">Hi, Player</span>
            <ChevronDown className="h-4 w-4 text-[#B8C1CC]" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] gap-3 px-4 pb-4 lg:hidden sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] px-4 py-3 shadow-[0_16px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <Search className="h-4 w-4 text-[#B8C1CC]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search turf or sport..."
            aria-label="Search turf or sport"
            className="w-full bg-transparent text-sm text-white placeholder:text-[#7f8b97] outline-none"
          />
        </div>
        <ClayButton icon={MapPin} className="px-4">
          Bangalore
        </ClayButton>
      </div>
    </motion.header>
  )
}

function SummaryRow({ label, value, strong = false, valueClassName = '' }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-[#B8C1CC]">{label}</span>
      <span className={strong ? `font-semibold ${valueClassName}` : `font-medium text-white ${valueClassName}`}>{value}</span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[rgba(11,15,20,0.96)]">
      <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(57,255,20,0.22),rgba(26,34,45,0.96))] text-sm font-black text-[#39FF14]">
              T
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7ef56a]">Turf Play</p>
              <p className="text-sm text-[#B8C1CC]">Luxury sports booking experiences.</p>
            </div>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[#B8C1CC]">
            Premium turf discovery, seamless scheduling, and modern sports operations in one polished interface.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-sm font-semibold text-white">{group.title}</p>
              <ul className="space-y-2 text-sm text-[#B8C1CC]">
                {group.items.map((item) => (
                  <li key={item}>
                    <a href="/" className="transition hover:text-[#39FF14]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-white">Newsletter</p>
          <p className="text-sm leading-7 text-[#B8C1CC]">Get launch drops, booking insights, and new turf openings.</p>
          <form className="flex gap-3">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(26,34,45,0.98),rgba(18,23,31,0.98))] px-4 py-3 text-sm text-white placeholder:text-[#7f8b97] outline-none"
            />
            <ClayButton active className="px-5">
              Join
            </ClayButton>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default App