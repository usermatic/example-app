// pages/api/hello.ts

import { verifyAuthToken } from '@usermatic/server'

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const { authorization } = req.headers

  if (!process.env.UM_APP_SECRET) {
    res.statusCode = 500
    const message = "No UM_APP_SECRET variable found in process.env, can't authenticate client"
    console.error(message)
    res.end(JSON.stringify({ message }))
    return
  }

  try {
    const authToken = verifyAuthToken(authorization, process.env.UM_APP_SECRET)
    res.statusCode = 200
    const date = new Date()
    res.end(JSON.stringify({
      message: `Hello ${authToken.id}, today is ${date.toLocaleDateString('en-US')}`
    }))
  } catch (err) {
    res.statusCode = 400
    res.end(JSON.stringify({ message: "user unauthenticated " + err }))
  }
}
