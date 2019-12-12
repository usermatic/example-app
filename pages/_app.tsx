// pages/_app.tsx

import App from 'next/app'
import Head from 'next/head'
import { UsermaticAuthProvider } from '@usermatic/client'

export default class extends App {
  render() {
    const {props} = this as any
    const {Component, pageProps} = props

    const appId = process.env.UM_APP_ID

    // Usermatic components are formatted with bootstrap classes. They don't
    // depend on any bootstrap javascript, so you can use them without bootstrap.
    return <>
      <Head>
        <title>Usermatic Example Application</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </Head>
      <UsermaticAuthProvider appId={appId} uri="http://api.usermatic.local:3002/graphql">
        <Component {...pageProps} />
      </UsermaticAuthProvider>
    </>
  }
}
