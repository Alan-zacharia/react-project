import {User} from "../model/UserModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt  from 'jsonwebtoken';


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
    const {email , password} = req.body;
    try{
        const userData = await User.findOne({email});
        if(userData){
            const isMatch = bcryptjs.compareSync(password , userData.password);
            if(isMatch){
               const token  = jwt.sign({_id : userData._id}, process.env.JWT_SECRET);
               const {password : HashedPassword  , ...others} = userData._doc;
               const expiryDate = new Date(Date.now() + 3600000); 
               res.cookie('accesstoken' , token , { httpOnly : true , expires : expiryDate }).status(200).json({others})
            }else{
                return next(errorHandler(401,'Wrong password'))
            }
        }else{
         return next(errorHandler(401,'Invalid credentials'))
        }
    }catch(err){
        next(err)
    }
}
const signupPost = async (req, res , next) => {
    const {
        username,
        email,
        password
    } = req.body;
    try{
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