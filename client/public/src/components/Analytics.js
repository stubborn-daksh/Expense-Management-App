import React from 'react'
import { Progress } from 'antd'

const Analytics = ({ allTransactions }) => {

    //catgory
    const categories = ['salary', 'medical', 'project', 'food', 'clothes', 'tax'];


    //total transactions
    const totalTransactions = allTransactions.length
    const totalIncomeTransactions = allTransactions.filter(transactions => transactions.type === 'income')
    const totalExpenseTransactions = allTransactions.filter(transactions => transactions.type === 'expense')
    const totalIncomePercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpensePercentage = (totalExpenseTransactions.length / totalTransactions) * 100

    //total-turnover
    const totalTurnover = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = allTransactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = allTransactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100


    return (
        <>
            <div className='row m-3'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transactions : {totalTransactions}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'> Income : {totalIncomeTransactions.length}</h5>
                            <h5 className='text-danger'> Expense: {totalExpenseTransactions.length}</h5>
                            <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercentage.toFixed(0)} />
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercentage.toFixed(0)} />
                        </div>

                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Turnover : {totalTurnover}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'> Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'> Expense: {totalExpenseTurnover}</h5>
                            <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)} />
                        </div>

                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-4'>
                    <h4>Expense Wise Category</h4>
                    {categories.map(category => {
                        const amount = allTransactions.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                        return (
                            amount > 0 &&
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className='row mt-3'>
                <div className='col-md-4'>
                    <h4>Income Wise Category</h4>
                    {categories.map(category => {
                        const amount = allTransactions.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                        return (
                            amount > 0 &&
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </>
    )
}

export default Analytics