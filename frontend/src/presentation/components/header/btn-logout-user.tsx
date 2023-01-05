import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'

const BtnLogoutUser: React.FC = () => {
  return (
    <Button
      id="btn-logout"
      aria-label="botão para fazer logout na aplicação"
      variant="contained"
      startIcon={<ArrowBack />}
      sx={{ marginLeft: 3 }}
    >
      Sair
    </Button>
  )
}

export { BtnLogoutUser }
