const jwt = require ('jsonwebtoken')

const generateToken = (id , name ) =>{
    return jwt.sign({id , name } , (process.env.JWT_SECRET || 'shoestop_secret_key_2026') , {
        expiresIn : '1h'
    })
}

module.exports = generateToken