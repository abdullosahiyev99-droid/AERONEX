import { useState } from 'react'
import { motion } from 'framer-motion'
import PlaneCanvas from '../components/PlaneCanvas'
import Footer from '../components/Footer'
import { useLang } from '../hooks/useLang.jsx'

const DEFAULT_FROM = 'TAS - Tashkent'
const DEFAULT_TO = 'DXB - Dubai'

const CABIN_LABELS = {
  economy: 'Economy',
  premium: 'Premium Economy',
  business: 'Business',
  first: 'First Class',
}

const FLIGHTS = [
  { num: 'HY501', airline: 'Uzbekistan Airways', code: 'HY', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'DXB', toCity: 'Dubai', dep: '08:30', arr: '10:45', dur: '3h 15m', stops: 'Direct', price: '$189', cls: 'Economy', best: true },
  { num: 'FZ441', airline: 'flydubai', code: 'FZ', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'DXB', toCity: 'Dubai', dep: '11:00', arr: '13:25', dur: '3h 25m', stops: 'Direct', price: '$162', cls: 'Economy', best: false },
  { num: 'EK702', airline: 'Emirates', code: 'EK', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'DXB', toCity: 'Dubai', dep: '16:45', arr: '19:00', dur: '3h 15m', stops: 'Direct', price: '$285', cls: 'Business', best: false },
  { num: 'TK347', airline: 'Turkish Airlines', code: 'TK', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'IST', toCity: 'Istanbul', dep: '14:00', arr: '18:30', dur: '4h 30m', stops: '1 Stop', price: '$142', cls: 'Economy', best: false },
  { num: 'KC868', airline: 'Air Astana', code: 'KC', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'ALA', toCity: 'Almaty', dep: '09:40', arr: '11:15', dur: '1h 35m', stops: 'Direct', price: '$156', cls: 'Premium Economy', best: false },
  { num: 'QR598', airline: 'Qatar Airways', code: 'QR', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'DOH', toCity: 'Doha', dep: '17:20', arr: '19:35', dur: '3h 15m', stops: 'Direct', price: '$199', cls: 'Economy', best: false },
  { num: 'LH785', airline: 'Lufthansa', code: 'LH', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'FRA', toCity: 'Frankfurt', dep: '06:20', arr: '12:50', dur: '6h 30m', stops: '1 Stop', price: '$418', cls: 'Business', best: false },
  { num: 'HY305', airline: 'Uzbekistan Airways', code: 'HY', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'SVO', toCity: 'Moscow', dep: '18:00', arr: '21:10', dur: '3h 10m', stops: 'Direct', price: '$98', cls: 'Economy', best: false },
  { num: 'BA147', airline: 'British Airways', code: 'BA', fromCode: 'TAS', fromCity: 'Tashkent', toCode: 'LHR', toCity: 'London', dep: '07:10', arr: '15:50', dur: '8h 40m', stops: '1 Stop', price: '$780', cls: 'First Class', best: false },
]

function normalizeInput(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function matchesLocation(query, code, city) {
  if (!query.trim()) return true

  const normalizedQuery = normalizeInput(query)
  return [code, city, `${code} ${city}`].some((value) =>
    normalizeInput(value).includes(normalizedQuery),
  )
}

function parsePrice(price) {
  return Number(price.replace(/[^0-9.]/g, ''))
}

function parseDuration(duration) {
  const match = duration.match(/(\d+)h(?:\s*(\d+)m)?/)
  if (!match) return Number.MAX_SAFE_INTEGER

  const [, hours, minutes = '0'] = match
  return Number(hours) * 60 + Number(minutes)
}

function sortFlights(flights, sort) {
  return [...flights].sort((a, b) => {
    if (sort === 'fastest') return parseDuration(a.dur) - parseDuration(b.dur)
    if (sort === 'best') return Number(b.best) - Number(a.best) || parsePrice(a.price) - parsePrice(b.price)
    return parsePrice(a.price) - parsePrice(b.price)
  })
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.15em] text-text3">{label}</label>
      {children}
    </div>
  )
}

function Pax({ label, value, min, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text2">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-faint bg-ink2 text-gold transition-colors hover:border-gold-mid"
        >
          -
        </button>
        <span className="w-5 text-center font-mono text-sm">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-faint bg-ink2 text-gold transition-colors hover:border-gold-mid"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function Booking() {
  const { t } = useLang()
  const [trip, setTrip] = useState('one_way')
  const [cabin, setCabin] = useState('economy')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState(DEFAULT_TO)
  const [sort, setSort] = useState('cheapest')
  const [appliedFilters, setAppliedFilters] = useState({
    from: DEFAULT_FROM,
    to: DEFAULT_TO,
    cabin: 'economy',
  })
  const today = new Date().toISOString().split('T')[0]

  const visibleFlights = sortFlights(
    FLIGHTS
      .filter((flight) => matchesLocation(appliedFilters.from, flight.fromCode, flight.fromCity))
      .filter((flight) => matchesLocation(appliedFilters.to, flight.toCode, flight.toCity))
      .filter((flight) => flight.cls === CABIN_LABELS[appliedFilters.cabin]),
    sort,
  )

  const applySearch = (event) => {
    event.preventDefault()
    setAppliedFilters({
      from,
      to,
      cabin,
    })
  }

  const routeSummary = `${appliedFilters.from || t('from')} -> ${appliedFilters.to || t('to')}`

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      <PlaneCanvas />

      <div className="relative z-10 px-4 pb-8 pt-[110px] md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest text-text3">Home / {t('nav_book')}</p>
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-wide">{t('book_title')}</h1>
          <p className="mt-2 text-sm text-text2">{t('book_sub')}</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 md:px-12">
        <div className="mb-6 flex border-b border-gold-faint">
          {[['one_way', 'One Way'], ['round_trip', 'Round Trip'], ['multi', 'Multi-City']].map(([key]) => (
            <button
              key={key}
              onClick={() => setTrip(key)}
              className={`-mb-px border-b-2 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-widest transition-all ${
                trip === key ? 'border-gold text-gold' : 'border-transparent text-text3 hover:text-text2'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        <form onSubmit={applySearch} className="rounded-md border border-gold-faint bg-ink/85 p-8 backdrop-blur-xl">
          <div className="mb-6 grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_44px_1fr_160px_140px_auto]">
            <Field label={t('from')}>
              <input
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className="w-full rounded-sm border border-gold-faint bg-ink2 px-4 py-3 font-body text-sm text-text outline-none transition-colors focus:border-gold"
              />
            </Field>
            <button
              type="button"
              onClick={() => {
                setFrom(to)
                setTo(from)
              }}
              className="flex h-[46px] w-[44px] items-center justify-center rounded-full border border-gold-faint bg-ink2 text-sm text-gold transition-all duration-300 hover:rotate-180 hover:border-gold-mid"
            >
              {'<>'}
            </button>
            <Field label={t('to')}>
              <input
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className="w-full rounded-sm border border-gold-faint bg-ink2 px-4 py-3 font-body text-sm text-text outline-none transition-colors focus:border-gold"
              />
            </Field>
            <Field label={t('depart')}>
              <input
                type="date"
                defaultValue={today}
                className="w-full rounded-sm border border-gold-faint bg-ink2 px-4 py-3 font-body text-sm text-text outline-none transition-colors focus:border-gold"
              />
            </Field>
            <Field label={t('return')}>
              <input
                type="date"
                disabled={trip === 'one_way'}
                className="w-full rounded-sm border border-gold-faint bg-ink2 px-4 py-3 font-body text-sm text-text outline-none transition-colors focus:border-gold disabled:cursor-not-allowed disabled:opacity-40"
              />
            </Field>
            <button
              type="submit"
              className="h-[46px] whitespace-nowrap rounded-sm bg-gold px-8 font-display text-lg tracking-widest text-ink transition-all hover:-translate-y-0.5 hover:bg-gold2"
            >
              {t('search')}
            </button>
          </div>

          <div className="mb-6 flex gap-8">
            <Pax label={t('adults')} value={adults} min={1} onChange={setAdults} />
            <Pax label={t('children')} value={children} min={0} onChange={setChildren} />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ['economy', 'Economy'],
              ['premium', 'Premium Economy'],
              ['business', 'Business'],
              ['first', 'First Class'],
            ].map(([key]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setCabin(key)
                  setAppliedFilters((current) => ({ ...current, cabin: key }))
                }}
                className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-wide transition-all ${
                  cabin === key
                    ? 'border-gold-mid bg-gold/15 text-gold'
                    : 'border-gold-faint bg-ink2 text-text2 hover:border-gold-mid hover:text-gold'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </form>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 md:px-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-text3">
            {t('results_label')} <span className="font-bold text-gold">{visibleFlights.length}</span> {t('results_for')} {routeSummary}
          </p>
          <div className="flex gap-2">
            {[
              ['cheapest', 'Cheapest'],
              ['fastest', 'Fastest'],
              ['best', 'Best'],
            ].map(([key]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                className={`rounded-sm border px-4 py-1.5 font-mono text-[0.65rem] tracking-wide transition-all ${
                  sort === key ? 'border-gold-mid text-gold' : 'border-gold-faint text-text3 hover:text-gold'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>

        {visibleFlights.length === 0 ? (
          <div className="rounded-md border border-gold-faint bg-ink/85 px-8 py-10 backdrop-blur-xl">
            <h2 className="font-display text-[2rem] leading-none">{t('no_flights_title')}</h2>
            <p className="mt-2 text-sm text-text2">{t('no_flights_sub')}</p>
          </div>
        ) : (
          visibleFlights.map((flight, index) => (
            <motion.div
              key={flight.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className={`mb-4 grid cursor-pointer grid-cols-1 items-center gap-6 rounded-md border px-8 py-6 backdrop-blur-xl transition-all hover:translate-x-1 hover:border-gold-mid md:grid-cols-[110px_1fr_auto] ${
                flight.best ? 'border-gold-mid bg-ink/85' : 'border-gold-faint bg-ink/85'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded border border-gold-faint bg-ink3 font-display text-base text-gold">
                  {flight.code}
                </div>
                <div className="text-center text-[0.7rem] text-text3">{flight.airline}</div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <div>
                  <div className="font-display text-[2rem] leading-none">{flight.fromCode}</div>
                  <div className="mt-1 font-mono text-[0.65rem] text-gold">{flight.dep}</div>
                  <div className="text-xs text-text2">{flight.fromCity}</div>
                </div>

                <div className="text-center">
                  {flight.best && (
                    <div className="mb-2 inline-block rounded-sm border border-sky2/25 bg-sky2/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-sky2">
                      BEST VALUE
                    </div>
                  )}
                  <div className="mb-1 font-mono text-xs text-text3">{flight.dur}</div>
                  <div className="flex items-center gap-1">
                    <div className="h-px flex-1 bg-gold/25" />
                    <span className="text-xs">o</span>
                    <div className="h-px flex-1 bg-gold/25" />
                  </div>
                  <div className={`mt-1 text-xs ${flight.stops === 'Direct' ? 'text-sky2' : 'text-text3'}`}>
                    {flight.stops === 'Direct' ? t('direct') : flight.stops}
                  </div>
                </div>

                <div>
                  <div className="font-display text-[2rem] leading-none">{flight.toCode}</div>
                  <div className="mt-1 font-mono text-[0.65rem] text-gold">{flight.arr}</div>
                  <div className="text-xs text-text2">{flight.toCity}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-1 font-mono text-[0.65rem] uppercase tracking-widest text-text3">{t('from')}</div>
                <div className="font-display text-[2.2rem] leading-none text-gold">{flight.price}</div>
                <div className="mt-1 text-xs text-text3">{flight.cls}</div>
                <button className="mt-3 w-full rounded-sm bg-gold py-2 font-display text-sm tracking-widest text-ink transition-colors hover:bg-gold2">
                  {t('select')}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Footer />
    </div>
  )
}
