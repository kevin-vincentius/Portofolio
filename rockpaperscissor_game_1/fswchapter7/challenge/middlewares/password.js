const bcrypt = require('bcrypt')

const hashPassword = (rawPassword) => {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(rawPassword, salt)
    return hashedPassword
}

const comparePassword = (rawPassword, hashedPassword) => {
    return bcrypt.compareSync(rawPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}