import React from "react"
import { BsChevronRight, BsEvStation } from "react-icons/bs"
import { RiMapPin2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../apiCalls/apiCalls"
import { Link } from "react-router-dom"
import LoaderPlayer from "../../components/LoaderPlayer"
import Station from "./Station"
import {
  setApiStation,
  setShowCard,
  setMyStationId,
  setUsername
} from "../../redux/userSlice"
import Loader from "../../components/Loader"

function MyFavoriteStations() {
  const { myFavoriteStations, username, token } = useSelector(
    (state) => state.userReducer
  )
  const dispatch = useDispatch()

  const getUser = async () => {
    try {
      const response = await getCurrentUser()
      if (response.sucess) {
        console.log(2)
        // dispatch(setToken(response))
        // dispatch(setUsername(response.data.username))
      }
    } catch (error) {
      console.log(3)
      // toast.error(error.message)
      // navigate('/listStations')
    }
  }

  return !username ? (
    <Loader />
  ) : (
    <div className="h-screen max-h-[73%] tablet-landscape:max-h-[92vh] w-screen tablet-landscape:w-2/5  tablet-landscape:mx-auto mt-[8.9rem] tablet-landscape:mt-[5em] tablet-landscape:[100vh] overflow-scroll">
      <Station />
      {myFavoriteStations?.map((station, id) => {
        return (
          <div
            key={id}
            onMouseUp={() => {
              dispatch(setShowCard(true))
              dispatch(setApiStation(station))
              dispatch(setMyStationId(station._id))
            }}
          >
            <div className="bg-cardBlack card text-gray-400 flex items-center justify-between p-2 gap-2 border border-l-0 border-r-0 border-t-0  border-b-[#35383F]">
              <div className="flex items-center">
                <div className="relative">
                  <BsEvStation className="text-white h-6 w-5 absolute left-[1.25rem] bg-green top-[1rem]" />
                  <RiMapPin2Fill className="h-[3.5rem] w-[3.5rem] text-green" />
                </div>
                <div className="flex justify-between">
                  <div className="w-full">
                    <h1 className="w-full mb-1 text-white line-clamp-1">
                      {station?.station_name}
                    </h1>
                    <span className="w-full text-sm font-light line-clamp-1">
                      {" "}
                      {station?.city}, {station?.street_address}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Link>
                  <BsChevronRight className="w-6 h-6 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default MyFavoriteStations
