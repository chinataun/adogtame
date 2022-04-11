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
const token = request.cookies.token;
if (token) {
  const user = jwt.verify(token, 'SECRET')

  request.user = user;
  console.log(user.user.role)
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

module.exports = cookieJwtAuth