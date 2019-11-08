
import { MouseEvent, useState } from 'react'

import {
  useToken,
  useReauthToken
} from '@usermatic/client'

import {
  ReauthenticateGuard
} from '@usermatic/client/components'

import { useFetch } from '../components/fetch'

const ReauthButton: React.FC<{onClose: () => void}> = ({onClose}) => {
  const { userJwt } = useToken()
  const reauthToken = useReauthToken()
  const { response, submit } = useFetch({
    path: '/api/reauth',
    query: 'hello',
    authToken: userJwt,
    reauthToken
  })

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    submit()
  }

  return <div className="d-flex flex-column align-items-center">
    { response
      ? <div>
          <div className="mb-3">
          Got response: <pre>{JSON.stringify(response, null, '  ')}</pre>
          </div>
          <div className="mb-3">
            Try clicking "dismiss" and re-doing this action. The reauthentication
            will be cached for 60 seconds, and you won't have to re-enter your
            password if you do this twice in a row.
          </div>
          <button className="btn btn-primary mb-3"
                  onClick={(e: MouseEvent) => { e.preventDefault(); onClose() }}>
            Dismiss
          </button>
          <div className="text-muted mb-3">
            (Have a look at <code>pages/api/reauth.ts</code> to see the server side
            of this.)
          </div>
        </div>
      : <>
          <h3>Are you sure you want to perform this dangerous action?</h3>
          <button className="mt-3 btn btn-danger" onClick={onClick}>
            Delete all data
          </button>
        </>
    }
  </div>
}

const Reauth: React.FC<{}> = () => {
  const [showGuard, setShowGuard] = useState(false)

  const close = () => { setShowGuard(false) }

  return <div className="container">
    <div className="row mt-5 justify-content-center">
      <div className="col-9">
        <div className="display-4 mb-5">
          Reathentication Demo.
        </div>
        <div className="lead">
          You can use <code>&lt;ReauthenticateGuard&gt;</code> to force
          users to re-authenticate before performing sensitive actions.
          For instance, lets imagine you have a button that allows users to
          instantly delete gigabytes of crucial data. You probably want to
          verify that the user didn't just walk away from their computer for
          a minute. Click "begin" to get started.
        </div>
      </div>
    </div>
    <div className="row mt-5 justify-content-center">
      <div className="col-5 d-flex justify-content-center">
        { showGuard
          ? <div className="shadow p-4 border rounded">
              <ReauthenticateGuard
                tokenContents="reauth-test"
                // maxTokenAge should be less than or equal to the maxAge required by
                // the backend. It controls how long a reauth token is cached for.
                maxTokenAge="60s"
                prompt={<h3>Enter your password to delete all data (not for real, don't worry)</h3>}
                onCancel={close}
              >
                <ReauthButton onClose={close} />
              </ReauthenticateGuard>
            </div>
          : <button className="btn btn-primary" onClick={() => { setShowGuard(true) }}>
              Click to begin
            </button>
        }
      </div>
    </div>
  </div>
}

export default Reauth
