import appFonts from '@/shared/styles/theme/custom/my-fonts'
import { Box, Typography } from '@mui/material'

interface HeaderProps {
  title: string
  subTitle?: string
  contentSubTitle?: string
}

const TitleHeader: React.FC<HeaderProps> = ({ title, subTitle, contentSubTitle }) => {
  return (
    <Box
      id="titulo e subtitulo da página"
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Typography
        aria-label="Título da página"
        variant="h1"
        fontSize="2.2rem"
        color="primary"
        fontFamily={appFonts.poppins}
        fontWeight="600"
      >
        {title}
      </Typography>
      {subTitle && (
        <Box
          aria-label="Sub-Título da página"
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
  )
}

export { TitleHeader }
