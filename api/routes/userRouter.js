import express from 'express';
const router = express.Router();
import {user} from '../contorller/userController.js'


router.get('/',user.login)
router.post('/login',user.loginPost)
router.post('/signup',user.signupPost)




export {router};