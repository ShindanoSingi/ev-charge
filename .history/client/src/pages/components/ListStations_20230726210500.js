import React, { useEffect } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import { useSelector } from "react-redux"
import {
  setAllStations,
  setApiStation,
  setShowCard
} from "../../redux/userSlice"
import { useDispatch } from "react-redux"
import { BsEvStation } from "react-icons/bs"
import { RiMapPin2Fill } from "react-icons/ri"
import { BsChevronRight } from "react-icons/bs"
import { Link } from "react-router-dom"
import Station from "./Station"
import LoaderPlayer from "../../components/LoaderPlayer"
import { GetAllStations } from "../../apiCalls/apiCalls"

function ListStations({ getApiStation }) {
  const { allStations, token } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  console.log(localStorage.getItem("token"))

  const getStations = async () => {
    try {
      const response = await GetAllStations()
      console.log(response)
      dispatch(setAllStations(response))
    } catch (error) {
      return error
    }
  }

  // const earthRaduisK = 6371; // Radius of the earth in km
  const earthRaduisM = 3959 // Radius of the earth in miles

  useEffect(() => {
    getStations()
  }, [])

  return !allStations.fuel_stations ? (
    <LoaderPlayer />
  ) : (
    <div className="h-[100dvh] list-stations w-screen mt-[7rem] overflow-scroll ">
      <Station />
      {React.Children.toArray(
        allStations.fuel_stations?.map((station) => {
          return (
            <div
              key={station.id}
              onMouseUp={() => {
                dispatch(setShowCard(true))
                dispatch(setApiStation(station))
              }}
            >
              <div className="bg-cardBlack card text-gray-400 flex items-center justify-between p-2 gap-2 border border-l-0 border-r-0 border-t-0  border-b-[#35383F]">
                <div className="flex items-center">
                  <div className="relative">
                    <BsEvStation className="text-white h-6 w-5 z-1 absolute left-[1.25rem] bg-green top-[1rem]" />
                    <RiMapPin2Fill className="h-[3.5rem] w-[3.5rem] text-green" />
                  </div>
                  <div className="justify-between">
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
        })
      )}
    </div>
  )
}

export default ListStations
