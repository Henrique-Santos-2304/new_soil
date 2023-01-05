import { useThemeContext } from '@/core/context'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const IconToggleTheme: React.FC = () => {
  const { themeName, toggleTheme } = useThemeContext()

  return (
    <Box
      id="btn-theme-container"
      mr={3}
      mb={5}
      component="button"
      bgcolor="transparent"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: 'none',
        ':hover': {
          cursor: 'pointer',
          opacity: 0.8,
          transition: 'all .4s linear'
        }
      }}
    >
      {themeName === 'light' ? (
        <DarkMode
          arial-label="botão que muda o tema global do site para escuro"
          id="icon-dark"
          fontSize="large"
          onClick={toggleTheme}
          color="primary"
          sx={{
            ':hover': {
              fontSize: '3rem',
              transition: 'all .4s linear'
            }
          }}
        />
      ) : (
        <LightMode
          arial-label="botão que muda o tema global do site para claro"
          id="icon-light"
          fontSize="large"
          onClick={toggleTheme}
          color="primary"
          sx={{
            ':hover': {
              fontSize: '3rem',
              transition: 'all .4s linear'
            }
          }}
        />
      )}
      <Typography
        id="txt-change-theme"
        aria-label="Texto indicando que o botão acima é usado para mudar o tema"
        variant="h6"
        color="primary"
        fontSize="0.8rem"
        fontWeight="400"
      >
        Mudar Tema
      </Typography>
    </Box>
  )
}

export { IconToggleTheme }
