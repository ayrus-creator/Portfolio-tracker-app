const joi = require('joi')
const moment = require('moment')

    const schema = joi.object({
    firstname: joi.string().pattern(/^[A-Za-z]+$/).required() ,
    lastname: joi.string().pattern(/^[A-Za-z]+$/).required(),
    email: joi.string().email().required() ,
    password: joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/),
    phone: joi.string().pattern(/[0-9]{10}/).required(),
    dateofbirth: joi.date().custom((value,helpers)=>{
        const age = moment().diff(moment(value),'years');
        if(age<18){
            return helpers.message("User should be 18+ years old")
        }else{
            return value;
        }
    }).required()
    })

    const loginschema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)
    })
    
    module.exports = {
        schema,
        loginschema
    }    

