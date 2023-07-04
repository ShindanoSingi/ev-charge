import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard, setToken } from '../../redux/userSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
const baseUrl_users = "https://bembe-charge.onrender.com/api/users/";

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
            const response = await axios.post(`${baseUrl_users}login`, values);
            // setSubmitting(false);
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
            // setSubmitting(false);
            return {
                success: false,
                data: error.response.data,
            };
        }
    };

    // const setTimeOut = () => {
    //     console.log(showCard);
    //     setTimeout(() => {
    //         dispatch(setShowCard(!showCard));
    //     }, 1000);
    //     dispatch(setShowCard(!showCard));
    // };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setToken(localStorage.getItem('token')));
        }

    }, []);

    return (
        <div className='center absolute min-h-screen bg-black min-w-[100vw] tablet-landscape:px-[10em] grid place-content-center desktop-landscape:place-content-center tablet-landscape:mt-20 desktop-landscape:mt-0 top-[50%] md:max-w-[50%]'>
            <h1 className=' text-gray-400 tablet-landscape:text-2xl  text-2xl md:text-4xl text-center mb-2'>Signin Form</h1>
            <div className='w-[20em] tablet-portrait:w-[30em] tablet-landscape:w-[30em]'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='flex md:text-2xl flex-col gap-3 text-gray-400'>
                        <div className='flex flex-col gap-0'>
                            <label className='text-lg tablet-landscape:text-xl md:text-2xl' htmlFor="username">Username</label>
                            <Field
                                id="username"
                                name="username"
                                type="text"
                                className='px-3 py-2 rounded-t-xl md:text-2xl tablet-landscape:text-xl'
                            />
                            <ErrorMessage name='username' />
                        </div>
                        <div className='flex flex-col gap-0 tablet-landscape:text-xl text-gray-400 md:text-2xl'>
                            <label className='text-lg tablet-landscape:text-xl md:text-2xl' htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className='px-3 py-2 md:text-2xl tablet-landscape:text-xl rounded-b-xl'
                            />
                            <ErrorMessage name='password' />
                        </div>
                        <div
                            className='bg-gray-400 hover:bg-green flex items-center mt-2 md:py-2 md:px-4 py-1 px-4 text-center text-gray-800 text-xl rounded-xl justify-center'>
                            <button className='md:text-2xl tablet-landscape:text-xl' onClick={onSubmit} type="submit">Submit</button>
                        </div>
                        <Link to='/listStations'>
                            <p className='text-center md:text-2xl tablet-landscape:text-xl' onClick={onSubmit} type="submit">Cancel</p>
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm