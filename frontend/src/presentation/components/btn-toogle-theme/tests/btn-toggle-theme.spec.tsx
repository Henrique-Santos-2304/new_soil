import { fireEvent, screen } from '@testing-library/react'
import { IconToggleTheme } from '../index'
import '@testing-library/jest-dom'
import { renderThemeMock } from '@/tests/index'

describe('Btn Toggler Theme Component', () => {
  it('should render component and write snapshot', () => {
    const { container } = renderThemeMock(<IconToggleTheme />)
    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should expected header to have button container', () => {
    const { container } = renderThemeMock(<IconToggleTheme />)

    const heading = container.querySelector("button[id='btn-theme-container']")

    expect(heading).toBeInTheDocument()
  })
  it('should expected header to have svg of theme light', () => {
    const { container } = renderThemeMock(<IconToggleTheme />)

    const heading = container.querySelector("svg[id='icon-light']")

    expect(heading).toBeInTheDocument()
  })

  it('should expected header to have svg of theme dark when have a click to dark button', () => {
    const { container } = renderThemeMock(<IconToggleTheme />)

    const svgLight = container.querySelector("svg[id='icon-light']")
    svgLight && fireEvent.click(svgLight)
    const svgDark = container.querySelector("svg[id='icon-dark']")
    expect(svgDark).toBeInTheDocument()
  })

  it('should expected header to have heading with change theme text', () => {
    renderThemeMock(<IconToggleTheme />)

    const heading = screen.getByRole('heading', {
      level: 6
    })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Mudar Tema')
  })
})
