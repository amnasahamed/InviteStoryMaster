import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Petals } from "./Petals";
import { Reveal, Ornament } from "./Reveal";

const options = [
  { id: "yes", label: "Joyfully yes" },
  { id: "maybe", label: "Trying my best" },
  { id: "no", label: "With regrets" },
] as const;

export function Rsvp() {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !choice) return;
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden px-5 py-20">
      {sent && <Petals count={22} burst />}
      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="RSVP" />
          <h2 className="text-primary mt-5 text-4xl font-light">Will you join us?</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm">
            Kindly let us know before 20 November 2026.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 rounded-[2rem] border p-6">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.span
                    className="shadow-gold grid h-16 w-16 place-items-center rounded-full"
                    style={{ backgroundImage: "var(--gradient-gold)" }}
                    initial={{ rotate: -30, scale: 0.5 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 12 }}
                  >
                    <Check className="text-emerald-ink h-7 w-7" />
                  </motion.span>
                  <p className="font-script text-gold-foil mt-5 text-4xl">Thank you</p>
                  <p className="text-foreground/75 mt-2 text-sm">
                    We have you down, {name.trim()}
                    {choice === "yes" ? ` — and ${guests} seat${guests > 1 ? "s" : ""}.` : "."}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-muted-foreground mt-6 text-[0.6rem] tracking-[0.3em] uppercase underline-offset-4 hover:underline"
                  >
                    Edit response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase"
                    >
                      Your name
                    </label>
                    <input
                      id="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Who is celebrating with us?"
                      className="border-gold/30 bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-gold mt-2 w-full rounded-full border px-5 py-3 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <span className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                      Your answer
                    </span>
                    <div className="mt-2 grid gap-2">
                      {options.map((o) => (
                        <motion.button
                          type="button"
                          key={o.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setChoice(o.id)}
                          className={`relative overflow-hidden rounded-full border px-5 py-3 text-left text-sm transition-colors ${
                            choice === o.id
                              ? "border-gold text-primary bg-secondary"
                              : "border-gold/25 text-foreground/70 hover:bg-secondary/60"
                          }`}
                        >
                          {choice === o.id && (
                            <motion.span
                              layoutId="rsvp-dot"
                              className="bg-gold absolute top-1/2 right-5 h-2 w-2 -translate-y-1/2 rounded-full"
                            />
                          )}
                          {o.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {choice === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-gold/25 flex items-center justify-between rounded-full border px-5 py-2.5">
                          <span className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                            Guests
                          </span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              aria-label="Fewer guests"
                              onClick={() => setGuests((g) => Math.max(1, g - 1))}
                              className="bg-secondary text-primary grid h-8 w-8 place-items-center rounded-full"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-primary font-display w-6 text-center text-2xl">
                              {guests}
                            </span>
                            <button
                              type="button"
                              aria-label="More guests"
                              onClick={() => setGuests((g) => Math.min(8, g + 1))}
                              className="bg-secondary text-primary grid h-8 w-8 place-items-center rounded-full"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={!name.trim() || !choice}
                    className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-4 text-xs tracking-[0.3em] uppercase disabled:opacity-40"
                  >
                    <Heart className="h-4 w-4" />
                    Send response
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
