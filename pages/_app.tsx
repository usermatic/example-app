// pages/_app.tsx

import App from 'next/app'
import Head from 'next/head'
import { UsermaticAuthProvider } from '@usermatic/client'

export default class extends App {
  render() {
    const {props} = this as any
    const {Component, pageProps} = props

    // Usermatic components are formatted with bootstrap classes. They don't
    // depend on any bootstrap javascript, so you can use them without bootstrap.
    return <>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </Head>
      <UsermaticAuthProvider siteId="8262167f-1256-4b22-ab6d-29f89d408382"
        uri="http://test.usermatic.local:3002/graphql">
        <Component {...pageProps} />
      </UsermaticAuthProvider>
    </>
  }
}
