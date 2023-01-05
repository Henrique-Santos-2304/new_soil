import '@testing-library/jest-dom'
import { renderThemeMock } from '@/tests/index'
import { BtnLogoutUser } from '../btn-logout-user'

describe('Btn Logout Component', () => {
  it('should render component and write snapshot', () => {
    const { container } = renderThemeMock(<BtnLogoutUser />)
    expect(container).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should expected header to have button logout', () => {
    const { container } = renderThemeMock(<BtnLogoutUser />)

    const heading = container.querySelector('button[id="btn-logout"]')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveProperty('id', 'btn-logout')
  })
})
