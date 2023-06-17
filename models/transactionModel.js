import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    type: {
        type: String,
        required: [true, 'type is required']
    },
    category: {
        type: String,
        required: [Number, 'category is required']
    },
    reference: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    }
}, { timestamps: true })

const transactionModel = mongoose.model('transactions', TransactionSchema);

export default transactionModel