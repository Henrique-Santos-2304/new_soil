import { render, RenderResult } from '@testing-library/react'
import { AppThemeProvider } from '@/core/index'
import { themeContextMock } from './contexts'

const renderThemeMock = (children: React.ReactNode): RenderResult => {
  themeContextMock('light')
  return render(<AppThemeProvider>{children}</AppThemeProvider>)
}

export { renderThemeMock }
