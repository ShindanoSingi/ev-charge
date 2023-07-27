import React from 'react'
import { MdDelete } from 'react-icons/md'
import { DeleteStation, GetFavoritesStations } from '../../apiCalls/apiCalls';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMyFavoriteStations, setMyFavoriteStationsLength } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


function DeleteButton() {

    const { myStationId } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        document.getElementById('account').click();
        document.getElementById('account').click();
    };

    const myToken = localStorage.getItem('token');

    const deleteFavStation = async () => {
        try {
            const response = await DeleteStation(myStationId, myToken);
            toast.success('Station deleted from favorites');
        } catch (error) {
            toast.error('Error deleting station');
        }
    };

    return (
        <MdDelete
            onClick={() => {
                deleteFavStation();
                handleClick();
            }}
            className='hover:text-red text-3xl  text-gray-400'
        />
    )
}

export default DeleteButton
