import { createContext, useContext, ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
}

export const ThemeContext = createContext<ThemeContextType>({ isDark: true })

export function useTheme() {
  return useContext(ThemeContext)
}

interface ThemeProviderProps {
  children: ReactNode
  isDark: boolean
}

export function ThemeProvider({ children, isDark }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
