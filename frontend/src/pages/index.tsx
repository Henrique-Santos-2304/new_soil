import { Header } from '@/presentation/components/header'
import Head from 'next/head'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>New Soil Tech</title>
        <meta
          name="description"
          content="Soil Tecnologia Agropecuária, Automatizando os trabalhos rurais"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
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
