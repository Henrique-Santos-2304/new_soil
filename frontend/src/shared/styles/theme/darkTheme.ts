import { green, grey, purple, teal } from '@mui/material/colors'
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: myCustomColors.white,
          color: teal['900'],

          ':hover': {
            backgroundColor: myCustomColors.white,
            opacity: 0.7,
            transition: 'all 0.4s ease-in-out'
          }
        },
        textPrimary: myCustomColors.green
      }
    }
  }
})

export { darkTheme }
