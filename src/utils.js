export function rand(a, b) {
  return Math.random() * (b - a) + a
}

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

export function nowClock() {
  return new Date().toLocaleTimeString('en-GB')
}
