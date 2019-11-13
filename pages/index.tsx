
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
    <button onClick={onClick}>Say Hello</button>
    { response
      ? <div>
          Got response: <pre>{JSON.stringify(response, null, '  ')}</pre>
        </div>
      : null }
  </>
}

const MyComponent: React.FC<{}> = () => {
  const { id, email, loading } = useCredentials()
  console.log('id, email, loading', id, email, loading)
  if (loading) {
    return <div>Please wait...</div>
  } else if (id) {
    return <div>
      You are logged in as user {id} with email {email}
      <p/>
      <HelloButton />
      <p/>
      <UMLogoutButton />
    </div>
  } else {
    return <div>
      <p/>Log in: <UMLoginForm />
      <p/>Or create an account: <UMAccountCreationForm />
    </div>
  }
}

const MyPage: React.FC<{}> = () => {
  return <div className="container">
    <div className="row">
      <div className="col-9">
        <MyComponent/>
      </div>
    </div>
  </div>
}

export default MyPage
