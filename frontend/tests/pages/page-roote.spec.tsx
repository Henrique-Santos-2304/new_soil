import { screen } from '@testing-library/react'
import Home from '@/pages/index'
import '@testing-library/jest-dom'
import { renderThemeMock } from '../mocks'
import { themeContextMock } from '@/tests/index'

describe('Home', () => {
  it('renders a heading welcome with the text valids', () => {
    themeContextMock('light')
    renderThemeMock(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Welcome to the Boillerplate Next Js/i
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a button confirm with the text valid', () => {
    themeContextMock('light')
    renderThemeMock(<Home />)

    const button = screen.getByRole('button', { name: 'Confirmar' })

    expect(button).toBeInTheDocument()
  })
})
