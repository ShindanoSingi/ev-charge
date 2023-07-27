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

  const getUser = async () => {
    try {
      const response = await getCurrentUser()
      console.log(response)
      if (response.sucess) {
        toast.success(response.message)
        dispatch(setUsername(response.data.username))
      }
    } catch (error) {
      toast.error(error.message)
      // navigate('/listStations')
    }
  }

  useEffect(() => {
    getUser()
    if (localStorage.getItem("token")) {
      getUser()
      console.log(localStorage.getItem("token"))
      dispatch(setToken(localStorage.getItem("token")))
      navigate("/listStations")
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
