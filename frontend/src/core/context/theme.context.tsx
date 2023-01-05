'use client'
import { ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { darkTheme, lightTheme } from '@/shared/index'

export interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

type ChildrenProps = { children: React.ReactNode }

const AppThemeContext = createContext({} as IThemeContextData)

function useThemeContext(): IThemeContextData {
  return useContext(AppThemeContext)
}

const AppThemeProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [themeName, setThemeName] =
    useState<IThemeContextData['themeName']>('dark')

  const toggleTheme: IThemeContextData['toggleTheme'] = useCallback(() => {
    setThemeName(themeName === 'light' ? 'dark' : 'light')
  }, [themeName])

  const theme = useMemo(() => {
    return themeName === 'light' ? darkTheme : lightTheme
  }, [themeName])

  return (
    <AppThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {children}
        </Box>
      </ThemeProvider>
    </AppThemeContext.Provider>
  )
}

export { AppThemeProvider, AppThemeContext, useThemeContext }
