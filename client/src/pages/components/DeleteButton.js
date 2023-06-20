import React from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteStation } from '../../apiCalls/apiCalls';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function DeleteButton() {

    const { myStationId, token } = useSelector((state) => state.userReducer);

    console.log(myStationId);
    console.log(token);

    const deleteFavStation = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/stations/my-station/${myStationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                toast.success('Station deleted from favorites');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
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