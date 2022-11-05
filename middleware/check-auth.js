// import JWT from "jsonwebtoken";


// export function verifyAccessToken(req, res, next) {
//     try{
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
//         req.userData = decoded;
//         //console.log(decoded);
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: "Auth Failed"
//         })
//     }
    
// }



import JWT from "jsonwebtoken";

import createError from 'http-errors';


export function verifyAccessToken (req, res, next) {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    console.log(token);
    JWT.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })
  }

  export function signAccessToken (userId)  {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.JWT_KEY
      const options = {
        expiresIn: '3h',
        issuer: 'pickurpage.com',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          //reject(createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  }
  export function signAdminAccessToken (AdminId)  {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.JWT_KEY_ADMIN
      const options = {
        expiresIn: '3h',
        issuer: 'pickurpage.com',
        audience: AdminId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message )
          //reject(createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  }
  export function verifyAdminAccessToken (req, res, next) {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    console.log(token);
    JWT.verify(token, process.env.JWT_KEY_ADMIN, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      next()
    })
  }

  export function signRefreshToken (userId) {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: '1y',
        issuer: 'pickurpage.com',
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          // reject(err)
          reject(createError.InternalServerError())
        }

        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
          resolve(token)
        })
      })
    })
  };
