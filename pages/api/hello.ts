// pages/api/hello.ts

import jwt from 'jsonwebtoken'

const verifyJwt = (authHeader?: string, secret: string) => {
  if (!authHeader) { return undefined }
  return jwt.verify(authHeader, process.env.UM_APP_SECRET)
}

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

  const authToken = verifyJwt(authorization, process.env.UM_APP_SECRET);

  if (authToken) {
    res.statusCode = 200
    const date = new Date()
    res.end(JSON.stringify({
      message: `Hello ${authToken.id}, today is ${date.toLocaleDateString('en-US')}`
    }))
  } else {
    res.statusCode = 400
    res.end(JSON.stringify({ message: "user unauthenticated" }))
  }
}
