import React, { useEffect } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { setToken, setUsername } from "../../redux/userSlice"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { hideLoader, showLoader } from "../../redux/loaderSlice"
import { GetCurrentUser, LoginUser } from "../../apiCalls/apiCalls"
// const baseUrl_users = "http://localhost:4000/api/users/"

const onSubmit = (values) => {
  const user = {
    username: values.username,
    password: values.password
  }
}

const LoginForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

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

  const handleSubmit = async (values) => {
    try{
      const response = await LoginUser(values);
      console.log(response)
         toast.success(response.message)
      localStorage.setItem("token", response.data)
      dispatch(setToken(localStorage.getItem("token")))
      dispatch(setUsername(response.user))
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    // handleSubmit()

    if (localStorage.getItem("token")) {
      navigate("/favoriteStations")
    }
  }, [])

  return (
    <div className="center absolute min-h-screen bg-black min-w-[100vw] tablet-landscape:px-[10em] grid place-content-center desktop-landscape:place-content-center tablet-landscape:mt-20 desktop-landscape:mt-0 top-[50%] md:max-w-[50%]">
      <h1 className="mb-2 text-2xl text-center text-gray-400 tablet-landscape:text-2xl md:text-4xl">
        Signin Form
      </h1>
      <div className="w-[20em] tablet-portrait:w-[30em] tablet-landscape:w-[30em]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-3 text-gray-400 md:text-2xl">
            <div className="flex flex-col gap-0">
              <label
                className="text-lg tablet-landscape:text-xl md:text-2xl"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="px-3 py-2 rounded-t-xl md:text-2xl tablet-landscape:text-xl"
              />
              <ErrorMessage name="username" />
            </div>
            <div className="flex flex-col gap-0 text-gray-400 tablet-landscape:text-xl md:text-2xl">
              <label
                className="text-lg tablet-landscape:text-xl md:text-2xl"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="px-3 py-2 md:text-2xl tablet-landscape:text-xl rounded-b-xl"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="flex items-center justify-center px-4 py-1 mt-2 text-xl text-center text-gray-800 bg-gray-400 hover:bg-green md:py-2 md:px-4 rounded-xl">
              <button
                className="md:text-2xl tablet-landscape:text-xl"
                onClick={onSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
            <Link to="/signup">
              <p className="text-center" onClick={onSubmit} type="submit">
                Not signed up yet?
                <span> Sign Up</span>
              </p>
            </Link>
            <Link to="/listStations">
              <p
                className="text-center md:text-2xl tablet-landscape:text-xl"
                onClick={onSubmit}
                type="submit"
              >
                Cancel
              </p>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginForm
