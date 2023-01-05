import Head from 'next/head'
import { Header } from '@/presentation/components/header'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Boillerplate Next.Js</title>
        <meta name="description" content="Boillerplate configurado para next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header
          title="Pivô 1"
          subTitle="Ultima Atualização: "
          contentSubTitle="05/01/2023 09:02:40"
        />
      </>
    </>
  )
}
