
import React, { useState, MouseEvent } from 'react'

import {
  useToken,
  usePrimaryEmail,
} from '@usermatic/client'

import { useFetch } from '../components/fetch'

export const HelloButton: React.FC<{}> = () => {
  // Get the authentication token
  const { userJwt } = useToken()

  const { submit, response } = useFetch({
    path: '/api/hello',
    query: 'hello',
    authToken: userJwt
  })

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    submit()
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

