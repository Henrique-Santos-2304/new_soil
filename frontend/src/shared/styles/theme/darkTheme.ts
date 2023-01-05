import { green, grey, purple, teal } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'
import AppFonts from './custom/my-fonts'
import appColors from './custom/myColors'

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: appColors.green,
      dark: green['800'],
      light: green['300'],
      contrastText: appColors.white
    },
    secondary: {
      main: appColors.white,
      dark: grey['500'],
      light: purple['400'],
      contrastText: appColors.green
    },
    background: {
      default: appColors.green
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
          backgroundColor: appColors.green,
          color: appColors.white,
          ':hover': {
            backgroundColor: appColors.green,
            color: appColors.white,
            opacity: 0.8,
            transition: 'all 0.4s linear'
          }
        },
        textPrimary: appColors.green
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: AppFonts.monteserrat,
          fontWeight: '900'
        }
      }
    }
  }
})

export { darkTheme }
