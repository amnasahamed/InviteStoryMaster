import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS, mapsEmbedUrl, mapsDirectionsUrl } from "../config";

export default function Venue() {
  return <section className="relative px-6 py-28 sm:px-10 sm:py-40"><div className="mx-auto max-w-6xl">
    <SectionHeading kicker="Where & when" title="Meet us by the water" />
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <Reveal className="flex flex-col items-start gap-3 text-left lg:sticky lg:top-28"><h3 className="font-display text-4xl text-glow-gold sm:text-5xl">{wedding.venue.name}</h3><p className="flex items-center gap-2 text-sm text-[#f7e9d2]/65"><MapPin size={14} />{wedding.venue.address}</p><p className="font-display mt-5 max-w-xs text-lg leading-7 text-[#f7e9d2]/60">{wedding.dateLabel}<br />{wedding.timeLabel}</p></Reveal>
      <div className="flex flex-col gap-5"><Reveal delay={0.08}><div className="map-frame overflow-hidden border border-glow-gold/25 p-2"><iframe title="Wedding venue map" src={mapsEmbedUrl} className="h-72 w-full grayscale-[35%] sepia-[15%] contrast-[1.08] sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></Reveal>
      <Reveal delay={0.14} className="grid grid-cols-1 gap-3 sm:grid-cols-2"><a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className="action-link"><CalendarPlus size={14}/>Google Calendar</a><button type="button" onClick={downloadICS} className="action-link"><CalendarPlus size={14}/>Download .ics</button><a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="action-link sm:col-span-2"><Navigation size={14}/>Open in Maps</a></Reveal></div>
    </div>
  </div></section>;
}
