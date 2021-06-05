if (process.env.NODE_ENV !== 'production') require('dotenv').config()

function token (payload) {
    // payload.time = new Date()
    // console.log(payload, '<<< payload');
    // let generatedToken = jwt.sign(payload, process.env.JWT_KEY)
    const string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let temp = ''
    for (let i = 0; i < 50; i++) {
        temp += string[Math.floor(Math.random() * string.length)]
    }
    return temp
    // return generatedToken
}

function decodeToken (token) {
    return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = {
    token,
    decodeToken
}
