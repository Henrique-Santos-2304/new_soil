import { screen } from '@testing-library/react'
import { Header } from '../index'
import '@testing-library/jest-dom'
import { renderThemeMock, themeContextMock } from '@/tests/index'

describe('Header Component', () => {
  it('should render component and write snapshot', () => {
    const { container } = renderThemeMock(<Header title="Olá" />)
    expect(container).toMatchSnapshot()
  })
  it('should expected header to have heading with title received', () => {
    themeContextMock('light')
    renderThemeMock(<Header title="Olá" />)

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Olá/i
    })

    expect(heading).toBeInTheDocument()
  })

  it('should expected header to have heading with subtitle received', () => {
    themeContextMock('light')
    renderThemeMock(<Header title="Olá" subTitle="send-subtitle" />)

    const heading = screen.getByRole('heading', {
      level: 4,
      name: /send-subtitle/i
    })

    expect(heading).toBeInTheDocument()
  })

  it('should expected header to have heading with content-subtitle received', () => {
    themeContextMock('light')
    renderThemeMock(<Header title="Olá" subTitle="send-content-subtitle" />)

    const heading = screen.getByRole('heading', {
      level: 4,
      name: /send-content-subtitle/i
    })

    expect(heading).toBeInTheDocument()
  })

  it('should expected header to have button logout', () => {
    themeContextMock('light')
    renderThemeMock(<Header title="Olá" subTitle="send-content-subtitle" />)

    const heading = screen.getByRole('button', { name: 'Sair' })

    expect(heading.id).toBe('btn-logout')
    expect(heading.ariaLabel).toBe('botão para fazer logout na aplicação')
    expect(heading).toBeInTheDocument()
  })
})
