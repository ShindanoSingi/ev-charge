import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCard } from '../../redux/userSlice';
import * as Yup from 'yup';

const onSubmit = values => {
    console.log(values);
};

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
                        // .max(15, 'Must be 15 characters or less')
                        // .username('Invalid username')
                        .required('Required!'),
                    email: Yup.string()
                        .email('Invalid email address')
                        //.max(255, 'Must be 255 characters or less')
                        .required('Required!'),
                    password: Yup.string()
                        // .max(20, 'Must be 20 characters or less')
                        .required('Required!'),
                })}
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