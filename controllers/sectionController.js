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
            section: input.section
        })
        User.findOne({email:input.email })
        .then(result => {
            if(result !== null){
                return res.send("student email is already exists!")
            }else {
                newStudent.save()
            .then(result => {
                Section.findOne({sectionName: input.section})
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
    const userData = auth.decode(req.headers.authorization);

    if(userData.role !== 'teacher'){
        return res.send('You are not a teacher!')
    }else {
        let newSection = new Section({
            sectionName: input.sectionName,
            grade: input.grade
        })

        newSection.save()
        .then(result => {
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
}