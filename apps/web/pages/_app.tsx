import '@rainbow-me/rainbowkit/styles.css'
import { AppProviders } from 'components/providers'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import '../globals.css'

const sans = Inter({ variable: '--font-sans', subsets: ['latin'] })
const mono = IBM_Plex_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans">
      <AppProviders>
        <DefaultSeo title="Starter App" description="lalala" />
        <Component {...pageProps} />
        <style jsx global>
          {`
            html {
              --font-mono: ${mono.style.fontFamily};
              --font-sans: ${sans.style.fontFamily};
            }
          `}
        </style>
      </AppProviders>
    </div>
  )
}
