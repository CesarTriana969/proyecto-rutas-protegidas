const checkUsersCredentials = require('./auth.controllers')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const responses = require('../utils/responses.handler')

const postLogin = (req, res) => {
  const { email, password } = req.body
  checkUsersCredentials(email, password)
    .then(data => {
      if (data) {
        const payloadObj = {
          id: data.id,
          email: data.email
        }
        const privateKey = process.env.JWT_SECRET
        const token = jwt.sign(payloadObj, privateKey)
        responses.success({
          res,
          status: 200,
          message: 'Correct credentials',
          data: token
        })
      } else {
        responses.error({
          res,
          status: 401,
          message: 'Invalid credentials'
        })
      }
    })
    .catch(error => {
      responses.error({
        res,
        status: 401,
        message: 'An error has ocurred',
        data: error
      })
    })
}

module.exports = postLogin;
