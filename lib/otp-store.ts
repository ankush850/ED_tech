// In-memory OTP store (dev/testing only)
// For production, replace with Redis or a database table

interface OTPEntry {
  otp: string
  expiresAt: number
}

// Using globalThis to persist across hot-reloads in Next.js dev mode
const globalStore = globalThis as typeof globalThis & {
  __otpStore?: Map<string, OTPEntry>
}

if (!globalStore.__otpStore) {
  globalStore.__otpStore = new Map<string, OTPEntry>()
}

const store = globalStore.__otpStore

/** Generate a random 6-digit OTP */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/** Store OTP for an email with a 10-minute expiry */
export function storeOTP(email: string, otp: string): void {
  store.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  })
}

/** Verify OTP — returns true if valid, throws descriptive error if not */
export function verifyOTP(email: string, otp: string): boolean {
  const entry = store.get(email.toLowerCase())

  if (!entry) {
    throw new Error("No OTP found for this email. Please request a new one.")
  }

  if (Date.now() > entry.expiresAt) {
    store.delete(email.toLowerCase())
    throw new Error("OTP has expired. Please request a new one.")
  }

  if (entry.otp !== otp) {
    throw new Error("Invalid OTP. Please check and try again.")
  }

  // OTP is valid — delete it so it can't be reused
  store.delete(email.toLowerCase())
  return true
}
