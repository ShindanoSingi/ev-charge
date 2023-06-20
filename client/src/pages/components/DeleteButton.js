import React from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteStation, getFavoritesStations } from '../../apiCalls/apiCalls';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMyFavoriteStations, setMyFavoriteStationsLength } from '../../redux/userSlice';


function DeleteButton() {

    const { myStationId } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    console.log(myStationId);
    const myToken = localStorage.getItem('token');
    console.log(myToken);

    const deleteFavStation = async () => {
        try {
            const response = await deleteStation(myStationId, myToken);
            toast.success('Station deleted from favorites');
            console.log(response);

            // const response2 = await getFavoritesStations(localStorage.getItem('token'));
            // setMyFavoriteStations(response2.data);
            // dispatch(setMyFavoriteStationsLength(response2.data.length));
            // console.log(response2);

        } catch (error) {
            toast.error('Error deleting station');
            console.log(error);
        }
    };

    return (
        <MdDelete
            onClick={() => {
                deleteFavStation();
            }}
            className='hover:text-red text-3xl  text-gray-400'
        />
    )
}

export default DeleteButton