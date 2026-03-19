"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface FocusModeContextValue {
  isFocusMode: boolean
  toggleFocusMode: () => void
}

const FocusModeContext = createContext<FocusModeContextValue>({
  isFocusMode: false,
  toggleFocusMode: () => {},
})

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false)

  // Apply/remove the focus-mode class on <body> for global CSS hooks
  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add("focus-mode")
    } else {
      document.body.classList.remove("focus-mode")
    }
    return () => {
      document.body.classList.remove("focus-mode")
    }
  }, [isFocusMode])

  const toggleFocusMode = () => setIsFocusMode((prev) => !prev)

  return (
    <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  )
}

export const useFocusMode = () => useContext(FocusModeContext)
