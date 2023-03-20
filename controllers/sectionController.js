const Section = require('../models/sectionSchema');
const User = require('../models/userSchema');
const auth = require('../auth');
const bcrypt = require('bcrypt');


// let Add Student

module.exports.addStudent = (req,res) => {
    let input = req.body;
    const userData = auth.decode(req.headers.authorization);
    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher!')
    }else {
        let newStudent = new User({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password:bcrypt.hashSync(input.password, 10),
            studsection: input.studsection
        })
        User.findOne({email:input.email })
        .then(result => {
            if(result !== null){
                return res.send("student email is already exists!")
            }else {
                newStudent.save()
            .then(result => {
                Section.findOne({sectionName: input.studsection})
                .then(result => {
                    result.students.push(newStudent)
                    
                    return result.save()
                    .then(save => true)
                    .catch(err => err)
                })
                .catch(err => {
                    return res.send(err)
                })

                return res.send({
                    msg: 'Successfully added student',
                    student: {
                        ...result._doc,
                        password: ''
                    }
                })
               
            })
            .catch(err => {
                return res.send(err)
            })
            }
        })
        
    }
}

//add section class

module.exports.addSection = (req,res) => {
    let input = req.body;
    let id = req.params.id;
    const userData = auth.decode(req.headers.authorization);

    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher!')
    }else {
      Section.findOne({sectionName:input.sectionName})
      .then(data => {
        if(data){
            res.send(false)
        }else{
            let newSection = new Section({
                sectionName: input.sectionName,
                grade: input.grade
            })
    
            newSection.save()
            .then(result => {
    
                User.findOne({_id: id})
                .then(result => {
                    result.section.push(newSection)
    
                   return result.save()
                    .then(save => true)
                    .catch(err = false)
                })
                return res.send({
                    msg: 'Section has been successfully added',
                    section: {
                        ...newSection._doc
                    }
                })
                
            })
           
            .catch(err => {
                return res.send(err)
            })
        }
      })
            
            
      
    }
}

// get section

module.exports.getSection = (req,res) => {
    const userData = auth.decode(req.headers.authorization)
    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher!')
    }else {
        User.findOne({_id: userData._id})
        .then(result => {
            return res.send(result.section)
            
        })
        .catch(err => {
            return res.send(err)
        })
    }
}

//get single section

module.exports.getSingleSection = (req,res) => {
    const id = req.params.id
    const userData = auth.decode(req.headers.authorization)
    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher!')
    }else { 
        Section.findById({_id: id})
        .then(result=> {
            return res.send(result)
        })
        .catch(err => {
            return res.send(err)
        })
    }

}

module.exports.deleteSection = (req,res) => {
    let id = req.params.id
    const userData = auth.decode(req.headers.authorization)
    if(userData.role === 'teacher'){
    Section.findByIdAndDelete({_id: id})
    .then(result =>{
        console.log(result)
        User.findOneAndUpdate({_id: userData._id}, {
            $pull : {
                section: result
            }
        },{new: true})
        .then(data => {
            // console.log(data)
        })

        res.send(true)
    })
    .catch(error =>{
        return res.send(false)
    })
    }else{
        res.send(false)
    }
}