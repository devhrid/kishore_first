const registerValidator = require('../validator/registerValidator')
const userValidator = require('../validator/userValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const Userinfo = require('../model/Userinfo')
const {serverError, resourceError} = require('../util/error')
const jwt = require('jsonwebtoken')
// login controller
module.exports = {
    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }
        
        User.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                if(password != user.password){
                    return resourceError(res, 'Password mismatch')
                }
          
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

              
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    userinfo(req, res) {
        let { name, email, hobby, gender } = req.body
        let validate = userValidator({ name, email, hobby, gender })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            Userinfo.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }
                  

                        let user2 = new Userinfo({
                            name,
                            email,
                            hobby,
                            gender
                        })

                        user2.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Info Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
             
                .catch(error => serverError(res, error))
        }
    },
    register(req, res) {
        let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword })
        
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                        let user1 = new User({
                            name,
                            email,
                            password,
                            balance: 0,
                            expense: 0,
                            income: 0
                        })

                        user1.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
             
                .catch(error => serverError(res, error))
        }
    },
    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => serverError(res, error))
    }
}