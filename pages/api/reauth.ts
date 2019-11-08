
// pages/api/reauth.ts

import { verifyAuthToken, verifyReauthToken } from '@usermatic/server'

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const { authorization, 'x-reauthtoken': reauthTokenContents } = req.headers

  try {
    const authToken = verifyAuthToken(authorization, process.env.UM_APP_SECRET)
    const reauthToken = verifyReauthToken(
      reauthTokenContents, process.env.UM_APP_SECRET, ['password'], { maxAge: "60s" }
    )

    if (JSON.parse(reauthToken.userContents) !== 'reauth-test') {
      return res.status(400).end(JSON.stringify({
        message: "invalid reauthToken " + reauthToken.userContents
      }))
    }

    res.statusCode = 200
    const date = new Date()
    res.end(JSON.stringify({
      message: `Hello ${authToken.id}, you have successfully deleted `
             + `gigabytes of important data`
    }))
  } catch (err) {
    res.statusCode = 400
    res.end(JSON.stringify({ message: "user unauthenticated " + err }))
  }
}
