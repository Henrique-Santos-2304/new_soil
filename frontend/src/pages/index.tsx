'use client'
import { Button, Typography, useTheme } from '@mui/material'
import { useThemeContext } from '@/core/context'
import Head from 'next/head'

export default function Home(): JSX.Element {
  const {
    palette: { secondary }
  } = useTheme()

  const { toggleTheme } = useThemeContext()
  return (
    <>
      <Head>
        <title>Boillerplate Next.Js</title>
        <meta
          name="description"
          content="Boillerplate configurado para next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Typography variant="h1" fontSize="1.8rem" marginBottom="2rem">
          Welcome to the Boillerplate Next Js
        </Typography>
        <Button
          variant="outlined"
          sx={{ bgcolor: secondary.main, color: '#000000' }}
          onClick={toggleTheme}
        >
          Confirmar
        </Button>
      </>
    </>
  )
}
