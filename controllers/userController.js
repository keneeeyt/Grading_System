const User = require('../models/userSchema');
const bcrypt= require('bcrypt');
const auth = require('../auth');



// lets add user
module.exports.addUsers = (req,res) => {
    let input = req.body;

    User.findOne({email: input.email})
    .then(result => {
        if(result !== null){
            return res.send('email is already exists!')
        }else {
            let newUser = new User({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password:bcrypt.hashSync(input.password, 10),
            })

            newUser.save()
            .then(result => {
                return res.send(true)
            })
            .catch(err => {
                return res.send(err)
            })
        }
    })
    .catch(err => {
        return res.send(err)
    })
}


// user authentication / login

module.exports.login = (req,res) => {
    let input = req.body;

    User.findOne({email: input.email})
    .then(result => {
        if(result === null){
            return res.send('email is not yet registered!')
        }else {
            const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

            if(isPasswordCorrect){
                const {password, ...others} = result._doc;
            return res.send({...others, auth:auth.createAccessToken(result)})

            } else {
                return res.send('password is incorrect!')
            }
        }
    })
    .catch(err => {
        return res.send(err)
    })
}


// getAlluser

module.exports.getAllUser = (req,res) => {
    const userData = auth.decode(req.headers.authorization)

    if(userData.role !== 'admin'){
        return res.send('you are not admin')
    } else {
        User.findOne({role: 'teacher'})
        .then(result => {
            if(result === null){
                return res.send('there is no teacher available')
            }else {
                return res.send(result)
            }
        })
    }
}