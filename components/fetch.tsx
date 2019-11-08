
import { useState, MouseEvent } from 'react'

import { useToken } from '@usermatic/client'


type FetchArgs = {
  path: string,
  query: any,
  authToken: string,
  reauthToken?: string
}

// Super simple hook to wrap fetch-based API calls for demo purposes
export const useFetch = ({ path, query, authToken, reauthToken }: FetchArgs) => {

  const [response, setResponse] = useState(undefined)

  const { userJwt } = useToken()

  const submit = () => {
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Send the authentication token to the backend, via
        // the Authorization header.
        'Authorization': userJwt,
        // Send reauth token, if an
        'X-ReauthToken': reauthToken
      },
      body: JSON.stringify({ query })
    }).then((result) => {
      return result.json()
    }).then((json) => {
      setResponse(json)
    })
  }

  return { response, submit }
}
