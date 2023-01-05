import { render, RenderResult } from '@testing-library/react'
import { AppThemeProvider } from '@/core/index'
import { themeContextMock } from './contexts'
import { IThemeContextData } from '@/domain/types'

const renderThemeMock = (children: React.ReactNode): RenderResult => {
  return render(<AppThemeProvider>{children}</AppThemeProvider>)
}

export { renderThemeMock }
