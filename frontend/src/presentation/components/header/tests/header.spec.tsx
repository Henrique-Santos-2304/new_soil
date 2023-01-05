import '@testing-library/jest-dom'
import { renderThemeMock } from '@/tests/index'
import { Header } from '..'

describe('Header Component', () => {
  it('should render component and write snapshot', () => {
    const { container } = renderThemeMock(<Header title="Olá" />)
    expect(container).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should expected title header component to be this', () => {
    const { container } = renderThemeMock(<Header title="Olá" />)

    const heading = container.querySelector('header[id="header-of-application"]')

    expect(heading).toBeInTheDocument()
  })

  it('should expected title header component to be this', () => {
    const { container } = renderThemeMock(<Header title="Olá" subTitle="send-content-subtitle" />)

    const heading = container.querySelector('div[id="titulo e subtitulo da página"]')

    expect(heading).toBeInTheDocument()
  })

  it('should expected toogle theme button component to be this', () => {
    const { container } = renderThemeMock(<Header title="Olá" subTitle="send-content-subtitle" />)

    const heading = container.querySelector('button[id="btn-theme-container"]')

    expect(heading).toBeInTheDocument()
  })

  it('should expected logout user button component to be this', () => {
    const { container } = renderThemeMock(<Header title="Olá" />)

    const heading = container.querySelector('button[id="btn-logout"]')

    expect(heading).toBeInTheDocument()
  })
})
