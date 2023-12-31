import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/login`, values);
            message.success('Login Successfully');
            localStorage.setItem('User', JSON.stringify({ ...data.user, password: '' }))
            setLoading(false);
            navigate('/')
        } catch (error) {
            setLoading(false);
            message.error('Something Went wrong');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('User')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <>
            <div className='register-page'>
                {loading && <Spinner />}
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>
                    <Form.Item label="Email" name="email">
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label="password" name="password">
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to='/register'>New User ? Click here to Register </Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login