import { green, grey } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import appFonts from './custom/my-fonts'
import AppFonts from './custom/my-fonts'
import appColors from './custom/myColors'

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: appColors.white,
      dark: grey['500'],
      light: grey['300'],
      contrastText: appColors.green
    },
    secondary: {
      main: appColors.green,
      dark: green['800'],
      light: green['300'],
      contrastText: '#ffffff'
    },
    background: {
      default: appColors.white
    }
  },
  typography: {
    fontFamily: AppFonts.monteserrat,
    fontWeightBold: 'bold'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: appColors.white,
          color: appColors.green,
          ':hover': {
            backgroundColor: appColors.white,
            color: appColors.green,
            opacity: 0.75,
            transition: 'all 0.4s ease-in-out'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: AppFonts.monteserrat,
          fontWeight: '900',
          letterSpacing: 0.5
        }
      }
    }
  }
})

export { lightTheme }
