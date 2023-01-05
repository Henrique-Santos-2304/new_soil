import appFonts from '@/shared/styles/theme/custom/my-fonts'
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Paper, Typography, useTheme } from '@mui/material'

interface HeaderProps {
  title: string
  subTitle?: string
  contentSubTitle?: string
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, contentSubTitle }) => {
  const { palette, spacing } = useTheme()

  return (
    <Box
      component={Paper}
      elevation={3}
      width="100%"
      height={spacing(18)}
      bgcolor={palette.secondary.main}
      display="flex"
      alignItems="center"
      justifyContent="start"
    >
      <Button
        id="btn-logout"
        aria-label="botão para fazer logout na aplicação"
        variant="outlined"
        startIcon={<ArrowBack />}
        sx={{ marginLeft: 3 }}
      >
        Sair
      </Button>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Typography
          variant="h1"
          fontSize="2.2rem"
          color="primary"
          fontFamily={appFonts.poppins}
          fontWeight="600"
        >
          {title}
        </Typography>
        {subTitle && (
          <Box mt={2} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" fontSize="1.1rem" color="primary" fontWeight="700">
              {subTitle}
            </Typography>
            {contentSubTitle && (
              <Typography variant="h4" ml={1} fontSize="1rem" color="primary" fontWeight="500">
                {contentSubTitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { Header }
