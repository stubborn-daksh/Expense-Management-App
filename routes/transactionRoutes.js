import express from 'express';
import { addTransaction, deleteTransaction, editTransaction, getAllTransaction } from '../controllers/transactionController.js';

//router object
const Router = express.Router();

//routers
//add-transaction || POST METHOD
Router.post('/add-transaction', addTransaction)

//get-transaction || POST METHOD
Router.post('/get-transaction', getAllTransaction)

//edit-transaction || POST METHOD
Router.post('/edit-transaction', editTransaction)

//edit-transaction || POST METHOD
Router.post('/delete-transaction', deleteTransaction)



export default Router;