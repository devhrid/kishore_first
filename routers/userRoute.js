const router = require('express').Router()
const authenticate = require('../authenticate')
const {register, allUser,userinfo,login} = require('../controllers/userController')

// Registration Route
// localhost:4000/api/users/register
router.post('/register', register)
router.post('/user',authenticate, userinfo)
router.post('/login', login)
router.get('/all', allUser)

module.exports = router