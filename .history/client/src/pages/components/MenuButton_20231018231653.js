import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import { AiOutlineMenu } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { GetFavoritesStations } from "../../apiCalls/apiCalls"
import { setMyFavoriteStations, setUsername } from "../../redux/userSlice"

function MenuButton() {
  const navigate = useNavigate()
  const { token, myFavoriteStations } = useSelector(
    (state) => state.userReducer
  )
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()

  const getAllMyFavoriteStations = async () => {
    try {
      const response = await GetFavoritesStations(localStorage.getItem("token"))
      dispatch(setMyFavoriteStations(response.data))
    } catch (error) {
      return error
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickLogout = () => {
    document.getElementById("account").click()
    document.getElementById("account").click()
  }

  const handleLogout = async () => {
    try {
      // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      localStorage.removeItem("token")
      setUsername("")
      handleClose()
      navigate("/")
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getAllMyFavoriteStations()
    handleLogout()
  }, [])

  return (
    <div className="left-[20%]">
        <AiOutlineMenu
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="bg-[#262A34] text-5xl font-thin text-gray-400" />

      <Menu
        className="mt-[3rem] ml-[0.7rem]"
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <div className="flex flex-col w-full gap-2 p-1">
          <Link to="/favoriteStations">
            <p
              id="account"
              className="w-full px-2 bg-gray-200 border-b-2 border-gray-400 hover:bg-black hover:text-white"
              onClick={() => {
                handleClose()
                getAllMyFavoriteStations()
              }}
            >
              My Account
            </p>
          </Link>

          <Link to="/signup">
            <p
              className="w-full px-2 bg-gray-200 border-b-2 border-gray-400 hover:bg-black hover:text-white"
              onClick={handleClose}
            >
              Sign Up
            </p>
          </Link>
          <Link to="/signin">
            <p
              className="w-full px-2 bg-gray-200 border-b-2 border-gray-400 hover:bg-black hover:text-white"
              onClick={handleClose}
            >
              Sign In
            </p>
          </Link>
          <p
            className="w-full px-2 bg-gray-200 hover:bg-black hover:text-white "
            onClick={() => {
              handleLogout()
              handleClickLogout()
              localStorage.removeItem("token")
              dispatch(setUsername(""))
              handleClose()
              navigate("/listStations")
            }}
          >
            Sign Out
          </p>
        </div>
      </Menu>
    </div>
  )
}

export default MenuButton
