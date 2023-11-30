const jwt = require('jsonwebtoken')
const SECRET_KEY = "thisIsUrSacredToken"

const generateToken =  (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})

    return token
}

const verifyToken = (token) => {
    const payload = jwt.verify(token, SECRET_KEY)

    return payload
}

module.exports = {
    generateToken,
    verifyToken
}
