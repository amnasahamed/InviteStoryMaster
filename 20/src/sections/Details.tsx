import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'

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
    const end = new Date(start.getTime() + 4 * 3600 * 1000)
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RoyalIvoryGold//Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@wedding`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${icsEscape(`${WEDDING.groom} & ${WEDDING.bride} — Wedding`)}`,
      `LOCATION:${icsEscape(WEDDING.venue)}`,
      `DESCRIPTION:${icsEscape(`You are warmly invited. ${WEDDING.hashtag}`)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'wedding-invitation.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${WEDDING.groom} & ${WEDDING.bride} — Wedding`
  )}&dates=${toIcsDate(WEDDING.date)}/${toIcsDate(
    new Date(WEDDING.date.getTime() + 4 * 3600 * 1000)
  )}&location=${encodeURIComponent(WEDDING.venue)}`

  return (
    <section ref={ref} className="reveal silk relative bg-[#faf6ee] px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="ornament text-xl"><span>❧</span></div>
        <p className="font-serif-display mt-6 text-sm leading-relaxed text-[#6b5626]">
          Together with their families
          <br />
          <span className="italic">{WEDDING.groom}, {WEDDING.groomFamily}</span>
          <br />
          <span className="italic">&amp; {WEDDING.bride}, {WEDDING.brideFamily}</span>
          <br />
          request the honour of your presence at their wedding celebration
        </p>

        {/* date card */}
        <div className="gold-frame mt-10 rounded-3xl bg-white/60 p-8 backdrop-blur-sm">
          <p className="font-serif-display text-lg uppercase tracking-[0.25em] text-[#4a3b22]">
            {WEDDING.dateLabel}
          </p>
          <p className="font-script mt-1 text-3xl text-[#b8912f]">{WEDDING.timeLabel}</p>
          <div className="ornament my-5 text-lg"><span>✦</span></div>
          <p className="text-sm leading-relaxed text-[#6b5626]">{WEDDING.venue}</p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={downloadIcs}
              className="rounded-full bg-[#b8912f] px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              📅 Add to Calendar
            </button>
            <a
              href={gcal}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#b8912f]/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#8a6a1f] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Save to Google Calendar
            </a>
          </div>
        </div>

        {/* map preview */}
        <div className="gold-frame mt-10 overflow-hidden rounded-3xl">
          <iframe
            title="Venue map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(WEDDING.mapQuery)}&output=embed`}
            className="h-64 w-full border-0"
            loading="lazy"
          />
          <a
            href={WEDDING.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="block bg-[#f3ecdd] px-6 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#8a6a1f] transition-colors hover:bg-[#ece1c8]"
          >
            📍 Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  )
}
