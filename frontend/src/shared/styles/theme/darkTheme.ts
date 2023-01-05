import { green, grey, purple } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import myCustomColors from './myColors'

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: myCustomColors.green,
      dark: green['800'],
      light: green['300'],
      contrastText: myCustomColors.white
    },
    secondary: {
      main: myCustomColors.white,
      dark: grey['500'],
      light: purple['400'],
      contrastText: myCustomColors.green
    },
    background: {
      default: myCustomColors.green
    }
  }
})

export { darkTheme }
