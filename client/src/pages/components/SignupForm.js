import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard } from '../../redux/userSlice';
import * as Yup from 'yup';

const SignupForm = () => {

    const { showCard } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    // const formik = useFormik({
    //     initialValues: {
    //         email: "",
    //         password: "",
    //         username: "",
    //     }
    // });

    // console.log(formik.values);

    return (
        <div className='absolute grid top-[30%] w-full p-6'>
            <Formik
                initialValues={{ email: '', password: '', username: '' }}
                onSubmit={values => {
                    console.log(values);
                    dispatch(setShowCard(false));
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        //.max(255, 'Must be 255 characters or less')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
            >
                <Form className='flex flex-col gap-2 text-gray-400'>
                    <label htmlFor="username">Username</label>
                    <Field
                        id="username"
                        name="username"
                        type="text"
                        className='px-3 py-1'
                    />
                    <ErrorMessage name='name' className='text-red' />
                    <label htmlFor="email">Email Address</label>
                    <Field
                        id="email"
                        name="email"
                        type="email"
                        className='px-3 py-1'
                    />
                    <ErrorMessage name='email' className='text-red' />
                    <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        className='px-3 py-1'
                    />
                    <ErrorMessage name='password' className='text-red' />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SignupForm