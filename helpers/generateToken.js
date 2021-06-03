function token () {
    const string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let temp = ''
    for (let i = 0; i < 50; i++) {
        temp += string[Math.floor(Math.random() * string.length)]
    }
    return temp
}

module.exports = {
    token
}
