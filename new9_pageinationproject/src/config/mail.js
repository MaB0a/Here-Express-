const nodemailer = require('nodemailer')
require('dotenv').config()
const { CURRENT_ENVIRONMENT, SMTP_USERNAME, SMTP_PASSWORD } = process.env
module.exports = nodemailer.createTransport({
  host: CURRENT_ENVIRONMENT == 'development' ? 'smtp.mailtrap.io' : '',
  port: 2525,
  secure: false,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
})
