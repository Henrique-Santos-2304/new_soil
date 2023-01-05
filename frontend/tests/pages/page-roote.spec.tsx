import Home from '@/pages/index'
import '@testing-library/jest-dom'
import { renderThemeMock } from '../mocks'

describe('Home', () => {
  it('renders a this component to be defined', () => {
    const { container } = renderThemeMock(<Home />)

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should expect to have header component ', () => {
    const { container } = renderThemeMock(<Home />)

    const header = container.querySelector('header[id="header-of-application')

    expect(header).toBeInTheDocument()
  })
})
