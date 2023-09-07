const User = require('../models/userSchema');
const bcrypt= require('bcrypt');
const auth = require('../auth');
const studentCard = require('../models/studentCard')


// lets add user
module.exports.addUsers = (req,res) => {
    let input = req.body;

    User.findOne({email: input.email})
    .then(result => {
        if(result !== null){
            return res.send({msg:'email is already exists!'})
        }else {
            let newUser = new User({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password:bcrypt.hashSync(input.password, 10),
                section: input.section,
                advisory: input.advisory,
                role:input.role
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
            return res.send(false)
        }else {
            const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

            if(isPasswordCorrect){
                const {password, ...others} = result._doc;
            return res.send({...others, auth:auth.createAccessToken(result)})

            } else {
                return res.send(false)
            }
        }
    })
    .catch(err => {
        return res.send(err)
    })
}


// getAllteacher

module.exports.getAllUser = (req,res) => {
    const userData = auth.decode(req.headers.authorization)

    if(userData.role !== 'admin'){
        return res.send('you are not admin')
    } else {
        User.find({role: 'teacher'})
        .then(result => {
            if(result === null){
                return res.send('there is no teacher available')
            }else {
                return res.send(result)
            }
        })
    }
}

module.exports.getProfile = (req, res) => {
	// let input = request.body;
	const userData = auth.decode(req.headers.authorization);

	console.log(userData);

	return User.findById(userData._id).then(result =>{
		// avoid to expose sensitive information such as password.
		result.password = "";

		return res.send(result);
	})

}


//GET SINGLE STUDENT for CARDS to show
module.exports.getStudent =(req,res)=> {
    const id = req.params.id
    const userData = auth.decode(req.headers.authorization)
        
            studentCard.findOne({studentId: id })
            .then(result => {
                return res.send(result)
            })
            .catch(err => {
                return res.send(err)
            })
      
       
    
}


// Delete user

module.exports.deleteUser = (req,res) => {
    let id = req.params.id
    const userData = auth.decode(req.headers.authorization)
    if(userData.role === 'admin'){
    User.findByIdAndDelete({_id: id})
    .then(result =>{
        res.send(true)
    })
    .catch(error =>{
        return res.send(false)
    })
    }else{
        res.send(false)
    }
}
