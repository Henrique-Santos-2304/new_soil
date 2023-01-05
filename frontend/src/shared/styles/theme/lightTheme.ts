import { blue, green, grey, yellow } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import myCustomColors from './myColors'

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: myCustomColors.white,
      dark: grey['500'],
      light: grey['300'],
      contrastText: myCustomColors.green
    },
    secondary: {
      main: myCustomColors.green,
      dark: green['800'],
      light: green['300'],
      contrastText: myCustomColors.white
    },
    background: {
      default: myCustomColors.white
    }
  }
})

export { lightTheme }
