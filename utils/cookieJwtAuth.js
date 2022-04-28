const jwt = require('jsonwebtoken');

const cookieJwtAuth = (request, response, next) => {
const token = request.cookies.token
if (token != undefined) {
  const user = jwt.verify(token, 'SECRET')
  request.user = user.user;
  if (user.user.role === 'Adoptante'){
    response.locals.user = user.user
    response.locals.adoptante = user.user.role
  } else if (user.user.role === 'Protectora') {
    response.locals.user = user.user
    response.locals.protectora = user.user.role
  } 
} 
next()
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'SECRET', (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = {cookieJwtAuth, authenticateToken}