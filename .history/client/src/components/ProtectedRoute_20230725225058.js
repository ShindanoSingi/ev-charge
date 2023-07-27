import React, { useEffect } from "react"
import { getCurrentUser } from "../apiCalls/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../pages/components/Header"
import { showLoader, hideLoader } from "../redux/loaderSlice"
import { setUsername, setToken } from "../redux/userSlice"
import { toast } from "react-hot-toast"

function ProtectedRoute({ children }) {
  const { username } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      // console.log(response)
      if (response.data.sucess) {
        toast.success(response.data.message)
        dispatch(setUsername(response.data.user))
      }
    } catch (error) {
      toast.error(error.message)
      // navigate('/listStations')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser()
      dispatch(setToken(localStorage.getItem("token")))
    } else {
      navigate("/listStations")
    }
  }, [])

  return (
    <div>
      <h1>{children}</h1>
    </div>
  )
}

export default ProtectedRoute
