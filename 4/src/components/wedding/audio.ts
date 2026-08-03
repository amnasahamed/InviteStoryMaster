/**
 * Tiny generative score: piano-ish plucks + oud-like plucks over sustained strings.
 * No audio files, no autoplay — driven only by the gramophone click.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let step = 0;

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

const pick = (i: number) => SCALE[((i % SCALE.length) + SCALE.length) % SCALE.length] ?? 440;

function note(freq: number, at: number, dur: number, type: OscillatorType, gain: number) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2200;
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0.0001, at);
  env.gain.exponentialRampToValueAtTime(gain, at + 0.04);
  env.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(env).connect(filter).connect(master);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

function pad(freq: number, at: number, dur: number) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0.0001, at);
  env.gain.linearRampToValueAtTime(0.055, at + 1.6);
  env.gain.linearRampToValueAtTime(0.0001, at + dur);
  osc.connect(env).connect(master);
  osc.start(at);
  osc.stop(at + dur + 0.1);
}

function schedule() {
  if (!ctx) return;
  const t = ctx.currentTime + 0.06;
  const bar = step % 8;

  if (bar === 0) {
    pad(130.81, t, 7.5);
    pad(196.0, t, 7.5);
  }
  note(pick(step * 3), t, 1.6, "triangle", 0.1);
  if (bar % 2 === 1) note(pick(step * 5) / 2, t + 0.25, 1.1, "sawtooth", 0.035);
  if (bar === 4) note(pick(SCALE.length - 1), t + 0.5, 2.2, "sine", 0.06);

  step += 1;
}

export function startMusic() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
  }
  void ctx.resume();
  if (master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.4);
  }
  if (timer === null) {
    schedule();
    timer = window.setInterval(schedule, 1000);
  }
}

export function stopMusic() {
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

/** Camera shutter: short noise burst + click. */
export function playShutter() {
  if (typeof window === "undefined") return;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;
  const c = ctx ?? new Ctor();
  ctx = c;
  void c.resume();
  const dur = 0.16;
  const buffer = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const decay = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const src = c.createBufferSource();
  src.buffer = buffer;
  const env = c.createGain();
  env.gain.value = 0.35;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 900;
  src.connect(env).connect(hp).connect(c.destination);
  src.start();
}

/** Bird chirp easter egg. */
export function playChirp() {
  if (typeof window === "undefined") return;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;
  const c = ctx ?? new Ctor();
  ctx = c;
  void c.resume();
  const t = c.currentTime;
  for (let i = 0; i < 3; i++) {
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = "sine";
    const at = t + i * 0.12;
    osc.frequency.setValueAtTime(1800 + i * 200, at);
    osc.frequency.exponentialRampToValueAtTime(2900 + i * 150, at + 0.07);
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(0.12, at + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, at + 0.1);
    osc.connect(env).connect(c.destination);
    osc.start(at);
    osc.stop(at + 0.14);
  }
}
