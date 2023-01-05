import type { AppProps } from 'next/app'
import { AppThemeProvider } from '@/core/context'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppThemeProvider>
      <Component {...pageProps} />;
    </AppThemeProvider>
  )
}
