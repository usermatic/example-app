// pages/_app.tsx

import App from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '@usermatic/client'

export default class extends App {
  render() {
    const {props} = this as any
    const {Component, pageProps} = props

    const appId = process.env.UM_APP_ID

    // Usermatic components are formatted with bootstrap classes, so we've imported bootstrap for
    // you here. They don't depend on any bootstrap javascript, so you can use them just fine
    // without bootstrap. They just won't be styled by default.
    return <>
      <Head>
        <link rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous" />
      </Head>
      <AuthProvider uri="http://api-local.usermatic.io:3002/graphql" showDiagnostics appId={appId}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  }
}
