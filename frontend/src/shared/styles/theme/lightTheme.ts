import { green, grey } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import myCustomColors from './myColors'

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
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
      contrastText: '#ffffff'
    },
    background: {
      default: myCustomColors.white
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: myCustomColors.green,
          color: myCustomColors.white,
          ':hover': {
            backgroundColor: myCustomColors.green,
            color: '#ffffff',
            opacity: 0.85,
            transition: 'all 0.4s ease-in-out'
          }
        }
      }
    }
  }
})

export { lightTheme }
