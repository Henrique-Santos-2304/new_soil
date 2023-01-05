import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderThemeMock } from '@/tests/index'
import { TitleHeader } from '../title-header'

describe('Title Header Component', () => {
  it('should render component and write snapshot', () => {
    const { container } = renderThemeMock(<TitleHeader title="Olá" />)

    expect(container).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
  it('should expected header to have heading with title received', () => {
    renderThemeMock(<TitleHeader title="Olá" />)

    const heading = screen.getByRole('heading', {
      level: 1
    })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Olá')
  })

  it('should expected header to have heading with subtitle received', () => {
    renderThemeMock(<TitleHeader title="Olá" subTitle="send-subtitle" />)

    const heading = screen.getByRole('heading', {
      level: 4
    })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('send-subtitle')
  })

  it('should expected header to have heading with content-subtitle received', () => {
    renderThemeMock(<TitleHeader title="Olá" subTitle="send-content-subtitle" />)

    const heading = screen.getByRole('heading', {
      level: 4
    })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('send-content-subtitle')
  })
})
