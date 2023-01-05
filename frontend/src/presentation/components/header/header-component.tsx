import { Box, Paper, useTheme } from '@mui/material'
import { IconToggleTheme } from '../btn-toogle-theme'
import { BtnLogoutUser } from './btn-logout-user'
import { TitleHeader } from './title-header'

interface HeaderProps {
  title: string
  subTitle?: string
  contentSubTitle?: string
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { palette, spacing } = useTheme()

  return (
    <Box component="header" id="header-of-application" aria-label="Cabeçalho da aplicação">
      <Box
        component={Paper}
        elevation={3}
        width="100%"
        height={spacing(18)}
        bgcolor={palette.secondary.main}
        display="flex"
        alignItems="center"
        justifyContent="start"
        sx={{ borderRadius: 0 }}
      >
        <BtnLogoutUser />
        <TitleHeader {...props} />
        <IconToggleTheme />
      </Box>
    </Box>
  )
}

export { Header }
