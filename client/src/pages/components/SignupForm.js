import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard } from '../../redux/userSlice';
import * as Yup from 'yup';
import axios from 'axios';

const onSubmit = values => {
    console.log(values);
    const user = {
        username: values.username,
        email: values.email,
        password: values.password
    }
};

const SignupForm = () => {

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Name is required!'),
        email: Yup.string().email('Invalid email address').required('Email is required!'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long!').required('Password is required!'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', values);
            console.log(response);
            setSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    };

    const { showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    return (
        <div className='absolute grid top-[30%] w-full p-6'>
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
                    <div className='flex flex-col gap-0 text-gray-400'>
                        <label className='text-lg' htmlFor="email">Email Address</label>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            className='px-3 py-2'
                        />
                        <ErrorMessage name='email' />
                    </div>
                    <div className='flex flex-col gap-0 text-gray-400'>
                        <label className='text-lg' htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            className='px-3 py-2 rounded-b-xl'
                        />
                        <ErrorMessage name='password' />
                    </div>
                    <div className='bg-gray-400 mt-2 p-1 text-center text-gray-800 text-xl rounded-xl'>
                        <button onClick={onSubmit} type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default SignupForm