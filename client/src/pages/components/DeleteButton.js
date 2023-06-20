import React from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteStation, getFavoritesStations } from '../../apiCalls/apiCalls';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { setMyFavoriteStations } from '../../redux/userSlice';


function DeleteButton() {

    const { myStationId, token } = useSelector((state) => state.userReducer);

    console.log(myStationId);
    const myToken = localStorage.getItem('token');
    console.log(myToken);

    const deleteFavStation = async () => {
        try {
            const response = await deleteStation(myStationId, token);
            console.log(response);
            toast.success('Station deleted from favorites');

            // const response2 = await getFavoritesStations(token);
            // setMyFavoriteStations(response2.data);
            // console.log(response2);

        } catch (error) {
            console.log(error);
            toast.error('Error deleting station');
        }
    };

    return (
        <div className='items-center gap-2'>
            <MdDelete
                onClick={() => deleteFavStation()}
                className='hover:text-red text-3xl  text-gray-400'
            />
        </div>
    )
}

export default DeleteButton