const jwt = require('jsonwebtoken');

const cookieJwtAuth = (request, response, next) => {
// const token = request.cookies.token;
//   try {
//     const user = jwt.verify(token, 'SECRET')
//     request.user = user;
//     next();  
//   } catch (error) {
//     response.clearCookie("token")
//     return response.redirect("/");
//   }
//   try {
//     const user = jwt.verify(token, 'SECRET')
//     request.user = user;
//     next();  
//   } catch (error) {
//     response.clearCookie("token")
//     return response.redirect("/");
//   }
const token = request.cookies.token;
if (token) {
  const user = jwt.verify(token, 'SECRET')

  request.user = user;
  if (user.user.role === 'Adoptante'){
    response.locals.user = request.user
    response.locals.adoptante = user.user.role
  } else if (user.user.role === 'Protectora') {
    response.locals.user = request.user
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