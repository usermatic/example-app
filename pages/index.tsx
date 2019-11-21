
import React, { useState, MouseEvent } from 'react'
import { useCredentials, UMLoginForm, UMLogoutButton, UMAccountCreationForm } from '@usermatic/client'

const HelloButton: React.FC<{}> = () => {
  const { userJwt } = useCredentials()

  const [response, setResponse] = useState(undefined)

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': userJwt
      },
      body: JSON.stringify({query: "{ hello }"})
    }).then((result) => {
      return result.json()
    }).then((json) => {
      setResponse(json)
    })
  }

  return <>
    <button className="btn btn-primary" onClick={onClick}>Say Hello</button>
    { response
      ? <div>
          Got response: <pre>{JSON.stringify(response, null, '  ')}</pre>
        </div>
      : null }
  </>
}

const LoginOrCreateAccount: React.FC<{}> = () => {
  const { id, email, loading } = useCredentials()

  if (loading) {
    return <div>Please wait...</div>
  } else if (id) {
    return <div className="p-4 border rounded shadow bg-light">
      You are logged in as user <code>{id}</code> with email <code>{email}</code>.
      <p/>
      <HelloButton />
      <p/>
      <UMLogoutButton />
    </div>
  } else {
    return <div>
      <h4>Log in:</h4>
      <div className="p-4 mb-5 border rounded shadow bg-light">
        <UMLoginForm />
      </div>
      <h4>Or create an account:</h4>
      <div className="p-4 mb-5 border rounded shadow bg-light">
        <UMAccountCreationForm />
      </div>
    </div>
  }
}

const MyPage: React.FC<{}> = () => {
  return <div className="container py-5">
    <div className="row">
      <div className="col-9">
        <h4 className="display-4 mb-5">Usermatic Example Application</h4>
        <LoginOrCreateAccount/>
      </div>
    </div>
  </div>
}

export default MyPage
