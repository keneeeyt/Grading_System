const jwt = require('jsonwebtoken');

const secret = process.env.MY_SECRET_CODE


// generete accessToken
module.exports.createAccessToken = (user) => {

    const data = {
        _id : user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role

    }

    return jwt.sign(data, secret, {})
}


//Very token if token is existing

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if(typeof token !== 'undefined'){
        token = token.slice(7, token.length)

        return jwt.verify(token, secret, (err, data) => {
            if(err){
                return res.send("authentication is not valid!")
            } else {
                next();
            }
        })
    } else {
        return res.send('authentication is not exists!')
    }
}


// decode token
module.exports.decode = (token) => {


    if(typeof token !== 'undefined'){
      token = token.slice(7, token.length)

        return jwt.decode(token, secret, (err, data) => {
            if(err){
                return null
            } else {
                return jwt.decode(token, {complete: true}).payload
            }
        })
    } else{
        return res.send('token is not even exists!')
    }
}