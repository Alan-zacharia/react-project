import {User} from "../model/UserModel.js";
import bcryptjs from 'bcryptjs'


const login = async(req, res , next) => {
    try{
        res.json({
            message: 'Hello world'
        })
    }catch(err){
        next(err)
    }
}
const loginPost = async(req, res , next) => {
    try{
        const {email , password} = req.body;
        const userData = await User.findOne({email : email});
        if(userData){
            const isMatch = bcryptjs.compare(password , userData.password);
            if(isMatch){
               
            }else{

            }
        }else{

        }
    }catch(err){
        next(err)
    }
}
const signupPost = async (req, res , next) => {
    try{
        const {
            username,
            email,
            password
        } = req.body;
        const user = await User.findOne({email : email});
        if(!user){
            let HashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({
            username: username,
            email: email,
            password :HashedPassword
        })
        await newUser.save();
        }else{
          return  res.status(400).send('Email already in use');
        } 
        return res.status(201).json({message : "created successfully"});
    }catch(error){
        next(error)
    }
};
export const user = {
    login,
    signupPost,
    loginPost
}