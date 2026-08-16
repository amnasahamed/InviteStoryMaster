import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { MapPin, Navigation, Calendar as CalendarIcon, Car, ExternalLink, Sun, Sparkles, Phone, Hotel, Plane } from 'lucide-react'

function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function toIcsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export default function Details() {
  const ref = useReveal<HTMLElement>()

  const downloadIcs = () => {
    const start = WEDDING.date
    const end = new Date(start.getTime() + 5 * 3600 * 1000)
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RoyalIvoryGold//Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@lake-pichola-wedding`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${icsEscape(`${WEDDING.groom} & ${WEDDING.bride} — Royal Wedding Celebration`)}`,
      `LOCATION:${icsEscape(WEDDING.venue)}`,
      `DESCRIPTION:${icsEscape(`Warmly invited to the royal wedding celebration of Aarav & Ananya at Lake Pichola, Udaipur. ${WEDDING.hashtag}`)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'aarav-ananya-royal-wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${WEDDING.groom} & ${WEDDING.bride} — Royal Wedding Celebration`
  )}&dates=${toIcsDate(WEDDING.date)}/${toIcsDate(
    new Date(WEDDING.date.getTime() + 5 * 3600 * 1000)
  )}&location=${encodeURIComponent(WEDDING.venue)}&details=${encodeURIComponent(
    `Cordially invited to celebrate the royal wedding of Aarav & Ananya. ${WEDDING.hashtag}`
  )}`

  return (
    <section id="details" ref={ref} className="reveal relative bg-gradient-to-b from-[#070b14] via-[#0d1629] to-[#070b14] px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Royal Venue &amp; Hospitality
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          The Palatial Destination
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1]">
          Lake Pichola, Udaipur
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        {/* Family Proclamation */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#dfb141]/35 bg-[#0d1527]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <p className="font-royal text-xs font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Together With Their Families
          </p>
          <div className="font-serif-display mt-3 text-sm leading-relaxed text-[#e6d3a3]">
            <p className="font-bold text-base sm:text-lg text-[#f8edd1]">
              {WEDDING.groomFullName} <span className="text-xs font-medium text-[#ffd768]">({WEDDING.groomFamily})</span>
            </p>
            <p className="font-script text-3xl text-[#dfb141] my-1.5">&amp;</p>
            <p className="font-bold text-base sm:text-lg text-[#f8edd1]">
              {WEDDING.brideFullName} <span className="text-xs font-medium text-[#ffd768]">({WEDDING.brideFamily})</span>
            </p>
          </div>
          <p className="font-serif-display italic text-xs sm:text-sm text-[#c9bea7] pt-3">
            humbly request the honour of your presence and blessings at the sacred wedding ceremonies.
          </p>
        </div>

        {/* Main Venue Card with 3D Tilt */}
        <div className="mt-14">
          <CardTilt intensity={6}>
            <div className="glass-twilight royal-corners overflow-hidden rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center">
              <span className="font-royal text-[10px] font-bold uppercase tracking-[0.4em] text-[#ffd768] bg-[#070b14] px-4 py-1.5 rounded-full border border-[#dfb141]/50 shadow-sm">
                Main Wedding Mandap
              </span>

              <h3 className="font-royal mt-6 text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-[#f8edd1]">
                {WEDDING.dateLabel}
              </h3>
              <p className="gold-text-glow font-script mt-2 text-5xl sm:text-6xl">{WEDDING.timeLabel}</p>

              <div className="ornament my-6 text-lg">
                <span>✦</span>
              </div>

              <div className="flex items-center justify-center gap-2.5 text-[#f8edd1] font-bold text-sm sm:text-base max-w-lg mx-auto">
                <MapPin className="h-5 w-5 text-[#ffd768] shrink-0" />
                <span>{WEDDING.venue}</span>
              </div>

              {/* Weather Pill */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#070b14]/80 border border-[#dfb141]/35 px-5 py-2 text-xs text-[#e6d3a3] shadow-inner">
                <Sun className="h-4 w-4 text-[#ffd768]" />
                <span>Udaipur Weather: {WEDDING.weather.temp} • {WEDDING.weather.forecast}</span>
              </div>

              {/* Quick Calendar Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={downloadIcs}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-6 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#070b14] shadow-[0_0_20px_rgba(223,177,65,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(223,177,65,0.5)] active:scale-95"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
                <a
                  href={gcal}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#dfb141]/60 bg-[#121c33] px-6 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] transition-all hover:bg-[#1a2849] hover:border-[#dfb141] hover:scale-105 active:scale-95 shadow-md"
                >
                  <CalendarIcon className="h-4 w-4 text-[#ffd768]" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Embedded Map & Uber Navigation */}
        <div className="glass-twilight mt-12 overflow-hidden rounded-3xl shadow-2xl text-left border border-[#dfb141]/40">
          <iframe
            title="Venue location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(WEDDING.mapQuery)}&output=embed`}
            className="h-80 w-full border-0 brightness-90 contrast-110"
            loading="lazy"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d1527] px-6 py-4 border-t border-[#dfb141]/25">
            <a
              href={WEDDING.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] hover:text-white transition-colors"
            >
              <Navigation className="h-4 w-4 text-[#ffd768]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>

            <a
              href={WEDDING.uberUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#f8edd1] hover:text-[#ffd768] transition-colors"
            >
              <Car className="h-4 w-4 text-[#ffd768]" />
              <span>Book Ride with Uber</span>
            </a>
          </div>
        </div>

        {/* Royal Hospitality & Travel Information Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-twilight rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
              <Plane className="h-4 w-4 text-[#dfb141]" />
              <span>Airport Travel</span>
            </div>
            <p className="font-serif-display mt-2 text-xs text-[#dcd1ba]">
              {WEDDING.hospitality.airport}
            </p>
          </div>

          <div className="glass-twilight rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
              <Hotel className="h-4 w-4 text-[#dfb141]" />
              <span>Stay &amp; Check-In</span>
            </div>
            <p className="font-serif-display mt-2 text-xs text-[#dcd1ba]">
              {WEDDING.hospitality.checkIn}
            </p>
          </div>

          <div className="glass-twilight rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
              <Phone className="h-4 w-4 text-[#dfb141]" />
              <span>Wedding Concierge</span>
            </div>
            <p className="font-serif-display mt-2 text-xs text-[#dcd1ba]">
              {WEDDING.hospitality.concierge}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
