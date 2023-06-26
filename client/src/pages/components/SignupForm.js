import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard } from '../../redux/userSlice';
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

const SignupForm = () => {

    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Name is required!'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long!').required('Password is required!'),
    });

    const wait = (timeout) => {
        timeout = timeout || 2000;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_USERS}register`, values);
            // setSubmitting(false);
            toast.success(response.data.message);

            navigate('/login');

            return {
                success: true,
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

    const { showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    return (
        <div className='absolute grid top-[30%] w-full p-6'>
            <h1 className=' text-gray-400 text-2xl text-center mb-2'>Signup Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='flex flex-col gap-3 text-gray-400'>
                    <div className='flex flex-col gap-0'>
                        <label className='text-lg' htmlFor="username">Username</label>
                        <Field
                            id="username"
                            name="username"
                            type="text"
                            className='px-3 py-2 rounded-t-xl'
                        />
                        <ErrorMessage name='username' />
                    </div>
                    <div className='flex flex-col gap-0 text-gray-400 '>
                        <label className='text-lg' htmlFor="password border-solid border-l-1 border-[400] ">Password</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            className='px-3 py-2 rounded-b-xl'
                        />
                        <ErrorMessage name='password' />
                    </div>
                    <div onClick={onSubmit} className='bg-gray-400 hover:bg-orange-400 flex justify-center items-center mt-2 p-1 text-center text-gray-800 text-xl rounded-xl'>
                        {
                            localStorage.getItem('token') && <AiOutlineCheck className='text-green-400' />
                        }
                        <button type="submit">Submit</button>
                    </div>
                    <Link to='/signin'>
                        <p className='text-center' onClick={onSubmit} type="submit">Already signed up?
                            <span> Sign In</span>
                        </p>
                    </Link>
                </Form>
            </Formik>
        </div>
    );
};

export default SignupForm