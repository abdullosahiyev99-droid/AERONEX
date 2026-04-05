import { createContext, useContext, useState, useEffect } from 'react'

const DarkCtx = createContext()

export function DarkProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }, [dark])

  return (
    <DarkCtx.Provider value={{ dark, setDark, toggle: () => setDark(d => !d) }}>
      {children}
    </DarkCtx.Provider>
  )
}

export function useDark() {
  return useContext(DarkCtx)
}
