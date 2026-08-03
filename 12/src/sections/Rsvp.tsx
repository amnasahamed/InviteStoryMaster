import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Send } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * SECTION 8 · RSVP — simple, gentle form.
 */
export default function Rsvp() {
  const [name, setName] = useState("")
  const [guests, setGuests] = useState("1")
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError("Please share your name so we know who is coming.")
      return
    }
    setError("")
    // Demo persistence — wire this to your backend or a form service.
    const existing = JSON.parse(localStorage.getItem("wedding-rsvps") ?? "[]")
    localStorage.setItem(
      "wedding-rsvps",
      JSON.stringify([...existing, { name, guests, phone, at: new Date().toISOString() }]),
    )
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="RSVP" title="Will you join us?" />

      <Reveal>
        <div className="photo-frame rounded-2xl bg-ivory/85 p-7 sm:p-9">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <Heart className="heart-beat h-8 w-8 fill-gold text-gold" strokeWidth={1} />
                <h3 className="font-script text-4xl text-ink">We can't wait!</h3>
                <p className="font-body text-sm font-light text-ink/70">
                  Thank you, {name.split(" ")[0]} — your seat is saved.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor="rsvp-name" className="eyebrow !text-[0.58rem]">Your name</Label>
                  <Input
                    id="rsvp-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="border-gold/25 bg-cream/60 font-body focus-visible:ring-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="rsvp-guests" className="eyebrow !text-[0.58rem]">Guests</Label>
                    <select
                      id="rsvp-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="h-9 w-full rounded-md border border-gold/25 bg-cream/60 px-3 font-body text-sm text-ink shadow-xs focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="rsvp-phone" className="eyebrow !text-[0.58rem]">Phone</Label>
                    <Input
                      id="rsvp-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 …"
                      className="border-gold/25 bg-cream/60 font-body focus-visible:ring-gold"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-center font-body text-xs text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  className="mt-1 h-11 rounded-full bg-gold font-body text-xs uppercase tracking-[0.24em] text-ivory shadow-md transition-all hover:bg-gold-dark hover:shadow-lg"
                >
                  <Send className="mr-2 h-3.5 w-3.5" />
                  Send RSVP
                </Button>

                <p className="text-center font-body text-[0.65rem] font-light italic text-muted-foreground">
                  Kindly respond before {config.displayDate.split(",")[0]}, we can't wait to celebrate with you.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
