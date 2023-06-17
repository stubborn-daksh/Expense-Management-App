import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
//router object
const Router = express.Router();

//routers
//ROUTE || Register
Router.post('/register', registerController);

//POST || LOGIN
Router.post('/login', loginController);



export default Router;