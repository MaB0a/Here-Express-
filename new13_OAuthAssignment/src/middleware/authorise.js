function authorize(permissionRoles) {
  return (req, res, next) => {
    //first get user from request
    const user = req.user
    //check if one role is permissible role
    let allowed = false
    const allowedArray = user.roles.map((role) => {
      if (permissionRoles.includes(role)) {
        allowed = true
      }
    })
    console.log(allowed)
    //if not , throw error
    if (!allowed)
      return res.status(403).send({ message: 'you are not allowed' })
    //if yes, then continue
    return next()
  }
}
module.exports = authorize
