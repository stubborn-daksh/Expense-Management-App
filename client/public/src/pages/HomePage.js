import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment, { text } from 'moment/moment'
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransaction] = useState([]);
    const [frequency, setfrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);
    //get-all transactions


    //table-data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: () => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEditable(record)
                        setShowModal(true)
                    }} />
                    <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
                </div>
            )
        },
    ]
    //form-handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('User'))
            setLoading(true)
            if (editable) {
                await axios.post(`${process.env.REACT_APP_API}/api/v1/transaction/edit-transaction`, {
                    payload: {
                        ...values,
                        userId: user._id
                    },
                    transactionId: editable._id
                });
                setLoading(false)
                message.success('Transaction Updated Successfully')
            } else {
                await axios.post(`${process.env.REACT_APP_API}/api/v1/transaction/add-transaction`, { ...values, userid: user._id });
                setLoading(false)
                message.success('Transaction Added Successfully')
            }
            setShowModal(false)
            setEditable(null)
        } catch (error) {
            setLoading(false)
            message.error('Failed to add transaction')
        }
    }

    useEffect(() => {
        const getAllTransaction = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('User'))
                setLoading(true)
                const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/transaction/get-transaction`, { userid: user._id, frequency, selectedDate, type })
                setLoading(false)
                setAllTransaction(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
                message.error('Fetch Issue With Transaction')
            }
        }
        getAllTransaction();
    }, [frequency, selectedDate, type])

    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_API}/api/v1/transaction/delete-transaction`, { transactionId: record._id })
            setLoading(false)
            message.success('Transaction Deleted Successfully!')

        } catch (error) {
            setLoading(false)
            console.log(error)
            message.error('Unable to Delete')
        }
    }

    return (
        <Layout>
            {loading && <Spinner />}
            <div className='filters'>
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values) => setfrequency(values)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                </div>
                <div className='switch-icon'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                </div>
                <div className='btn btn-primary' onClick={() => { setShowModal(true) }}>Add New</div>
            </div>

            <div className='content'>
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} />
                    : <Analytics allTransactions={allTransactions} />}

            </div>

            <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="clothes">Clothes</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'>{" "}Save</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage