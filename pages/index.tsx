
import React from 'react'
import Link from 'next/link'
import {
  useToken,
  usePrimaryEmail,
} from '@usermatic/client'

import {
  LoginForm,
  LogoutButton,
  AccountCreationForm
} from '@usermatic/client/components'

import { HelloButton } from '../components/hello-button'

const LoginOrCreateAccount: React.FC<{}> = () => {
  const { id, loading } = useToken()
  const { email } = usePrimaryEmail()

  if (loading) {
    return <div>Please wait...</div>
  } else if (id) {
    return <div className="p-4 border rounded shadow bg-light">
      You are logged in as user <code>{id}</code> with email <code>{email}</code>.
      <p/>
      <Link href="/profile"><a>Click here to view your profile.</a></Link>.
      <p/>
      <Link href="/reauth"><a>Click here to test re-authentication.</a></Link>.
      <p/>
      You can test authentication by sending an XHR request to the backend: <HelloButton/>
      <p/>
      To log out, click here: <LogoutButton/>
      <p/>
    </div>
  } else {
    return <div className="d-flex justify-content-between">
      <div>
        <h3>Log in</h3>
        <div className="p-4 mb-5 border rounded shadow bg-light">
          <LoginForm />
        </div>
      </div>
      <div>
        <h3>Or create an account</h3>
        <div className="p-4 mb-5 border rounded shadow bg-light">
          <AccountCreationForm />
        </div>
      </div>
    </div>
  }
}

const MyPage: React.FC<{}> = () => {
  return <div className="container">
    <div className="row mt-5">
      <div className="col-9">
        <h4 className="display-4 mb-5">Usermatic Example Application</h4>
        <LoginOrCreateAccount/>
      </div>
    </div>
  </div>
}

export default MyPage
