import React, { useEffect } from "react"
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { setShowCard } from "../../redux/userSlice"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineCheck } from "react-icons/ai"
// const baseUrl_users = "http://localhost:4000/api/users/"
import {RegisterUser} from '../../apiCalls/apiCalls'

const onSubmit = (values) => {
  const user = {
    username: values.username,
    password: values.password
  }
}

const SignupForm = () => {
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long!")
      .required("Password is required!")
  })

  const handleSubmit = async (values, { setSubmitting }) => {
     try{
      const response = await RegisterUser(values);
      if (response.success){
        toast.success(response.message)
        dispatch(setShowCard(true))
      }else{
        toast.error(response.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const { showCard } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  console.log(localStorage.getItem("token"))

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/favoriteStations")
    }
  }, [])

  return (
    <div className="absolute desktop-landscape:px-[30%] grid place-content-center top-[30%] desktop-landscape:top-[30%] w-full tablet-landscape:top-[20%] tablet-landscape:bg-black tablet-landscape:px-[20%]">
      <h1 className="mb-2 text-2xl text-center text-gray-400 ">Signup Form</h1>
      <div className="w-[20em] tablet-portrait:w-[30em] tablet-landscape:w-[30em]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-3 text-gray-400">
            <div className="flex flex-col gap-0">
              <label className="text-lg" htmlFor="username">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="px-3 py-2 rounded-t-xl"
              />
              <ErrorMessage name="username" />
            </div>
            <div className="flex flex-col gap-0 text-gray-400 ">
              <label
                className="text-lg"
                htmlFor="password border-solid border-l-1 border-[400] "
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="px-3 py-2 rounded-b-xl"
              />
              <ErrorMessage name="password" />
            </div>
            <div
              onClick={onSubmit}
              className="flex items-center justify-center p-1 mt-2 text-xl text-center text-gray-800 bg-gray-400 hover:bg-orange-400 rounded-xl"
            >
              {localStorage.getItem("token") && (
                <AiOutlineCheck className="text-green-400" />
              )}
              <button type="submit">Submit</button>
            </div>
            <Link to="/signin">
              <p className="text-center" onClick={onSubmit} type="submit">
                Already signed up?
                <span> Sign In</span>
              </p>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignupForm
