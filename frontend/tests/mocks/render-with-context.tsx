import { render, RenderResult } from '@testing-library/react'
import { AppThemeProvider } from '@/core/index'

const renderThemeMock = (children: React.ReactNode): RenderResult => {
  return render(<AppThemeProvider>{children}</AppThemeProvider>)
}

export { renderThemeMock }
