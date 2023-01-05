import { Poppins } from '@next/font/google'
import { Montserrat } from '@next/font/google'

const instancePoppins = Poppins({ weight: '400' })
const instanceMonteserrat = Montserrat({ subsets: ['latin'] })

const appFonts = {
  poppins: instancePoppins.style.fontFamily,
  monteserrat: instanceMonteserrat.style.fontFamily
}

export default appFonts
