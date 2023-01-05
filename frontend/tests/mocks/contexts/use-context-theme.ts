import { IThemeContextData } from '@/core/context'

const themeContextMock = (defaultTheme: 'light' | 'dark'): IThemeContextData => {
  const themeContext: IThemeContextData = {
    themeName: defaultTheme,
    toggleTheme: jest.fn().mockImplementation((newTheme) => {
      themeContext.themeName = newTheme
    })
  }

  return themeContext
}

export { themeContextMock }
