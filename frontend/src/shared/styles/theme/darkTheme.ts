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
    fontWeightBold: 'bold',
    fontSize: 2
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: appColors.white,
          color: teal['900'],

          ':hover': {
            backgroundColor: appColors.white,
            opacity: 0.7,
            transition: 'all 0.4s ease-in-out'
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
