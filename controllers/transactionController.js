import transactionModel from "../models/transactionModel.js"
import moment from "moment/moment.js";


export const getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body
        const trans = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                },
            }),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        });
        res.status(201).json(trans)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction Created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

export const editTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
        res.status(200).send('Edit Successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId })
        res.status(200).send('Transaction Deleted Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};