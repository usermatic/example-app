// pages/api/hello.ts

import jwt from 'jsonwebtoken'

const verifyJwt = (authHeader: string | undefined, secret: string) => {
  if (!authHeader) { return undefined }
  try {
    return jwt.verify(authHeader, process.env.UM_SITE_SECRET)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const { authorization } = req.headers

  if (!process.env.UM_SITE_SECRET) {
    res.statusCode = 500
    const message = "No UM_SITE_SECRET variable found in process.env, can't authenticate client"
    console.error(message)
    res.end(JSON.stringify({ message }))
    return
  }

  const authToken = verifyJwt(authorization, process.env.UM_SITE_SECRET);

  if (authToken) {
    res.statusCode = 200
    res.end(JSON.stringify({
      message: `Hello ${authToken.email}, you are authenticated`
    }))
  } else {
    res.statusCode = 400
    res.end(JSON.stringify({ message: "user unauthenticated" }))
  }
}
