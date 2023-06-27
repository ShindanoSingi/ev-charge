import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard, setToken } from '../../redux/userSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';


const onSubmit = values => {
    const user = {
        username: values.username,
        password: values.password
    }
};

const LoginForm = () => {
    const navigate = useNavigate();
    const { token, showCard } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Name is required!'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long!').required('Password is required!'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_USERS}login`, values);
            setSubmitting(false);
            toast.success('User Logged In Success!');
            localStorage.setItem('token', response.data.token);
            dispatch(setToken(response.data.token));
            navigate('/listStations');
            return {
                success: true,
                user: response.data.user,
                data: response.data,
            }

        } catch (error) {
            toast.error(error.response.data.message);
            setSubmitting(false);
            return {
                success: false,
                data: error.response.data,
            };
        }
    };

    const setTimeOut = () => {
        console.log(showCard);
        setTimeout(() => {
            dispatch(setShowCard(!showCard));
        }, 1000);
        dispatch(setShowCard(!showCard));
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setToken(localStorage.getItem('token')));
            console.log(token);
        }

    }, []);

    return (
        <div className='center absolute grid top-[30%] w-full md:max-w-[50%] p-6'>
            <h1 className=' text-gray-400 text-2xl md:text-4xl text-center mb-2'>Signin Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='flex md:text-2xl flex-col gap-3 text-gray-400'>
                    <div className='flex flex-col gap-0'>
                        <label className='text-lg md:text-2xl' htmlFor="username">Username</label>
                        <Field
                            id="username"
                            name="username"
                            type="text"
                            className='px-3 py-2 rounded-t-xl md:text-2xl'
                        />
                        <ErrorMessage name='username' />
                    </div>
                    <div className='flex flex-col gap-0 text-gray-400 md:text-2xl'>
                        <label className='text-lg md:text-2xl' htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            className='px-3 py-2 md:text-2xl rounded-b-xl'
                        />
                        <ErrorMessage name='password' />
                    </div>
                    <div onClick={() => {
                        setTimeOut();
                    }}
                        className='bg-gray-400 hover:bg-green flex items-center mt-2 md:py-2 md:px-4 py-1 px-4 text-center text-gray-800 text-xl rounded-xl justify-center'>
                        <button className='md:text-2xl' onClick={onSubmit} type="submit">Submit</button>
                    </div>
                    <Link to='/listStations'>
                        <p className='text-center md:text-2xl' onClick={onSubmit} type="submit">Cancel</p>
                    </Link>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm