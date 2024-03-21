import * as yup from 'yup'

const fullNameReg:RegExp=/^[a-zA-Z ]{3,}$/
const userNameReg:RegExp=/^[a-zA-Z ]{4,}$/
const passwordReg:RegExp=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{7,}$/

export const signupSchema=yup.object().shape({
    fullName:yup.string().min(3).matches(fullNameReg,{message:'Please enter a valid name'}).required('This field is required'),
    username:yup.string().min(4).matches(userNameReg,{message:'Please enter a valid username'}).required('This field is required'),
    email:yup.string().email('Please enter a valid email').required('This field is required'),
    password:yup.string().min(6).matches(passwordReg,{message:'Please enter a strong password'}).required('This field is required'),
    confirmPassword:yup.string()
        .oneOf([yup.ref("password")],'Passwords must match').required('This field is required')

})