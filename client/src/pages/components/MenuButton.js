import React, { useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getFavoritesStations } from '../../apiCalls/apiCalls'
import { setMyFavoriteStations, setUsername } from '../../redux/userSlice';


function MenuButton() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.userReducer);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const getAllMyFavoriteStations = async () => {
        try {
            const response = await getFavoritesStations(localStorage.getItem('token'));
            dispatch(setMyFavoriteStations(response.data));
        } catch (error) {
            return error;
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickLogout = () => {
        document.getElementById('account').click();
        document.getElementById('account').click();
    };

    const handleLogout = async () => {
        try {
            // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            localStorage.removeItem("token");
            setUsername('');
            handleClose();
            navigate('/');
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        getAllMyFavoriteStations();
        handleLogout();
    }, []);

    return (
        <div className='left-[20%]'>
            <Button
                className='bg-[#262A34]'
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AiOutlineMenu className='text-gray-400 text-5xl font-thin' />
            </Button>
            <Menu
                className='mt-[3rem] ml-[0.7rem]'
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
            >
                <div className='p-1 flex flex-col gap-2 w-full'>
                    <Link to='/favoriteStations'>
                        <p
                            id='account'
                            className='bg-gray-200 px-2 w-full hover:bg-black hover:text-white border-b-2 border-gray-400'
                            onClick={() => {
                                handleClose();
                                getAllMyFavoriteStations();
                            }}
                        >My Account</p>
                    </Link>

                    <Link to='/signup'>
                        <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full border-b-2 border-gray-400' onClick={handleClose}>Sign Up</p>
                    </Link>
                    <Link to='/signin'>
                        <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full border-b-2 border-gray-400' onClick={handleClose}>Sign In</p>
                    </Link>
                    <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full ' onClick={() => {
                        handleLogout();
                        localStorage.removeItem('token');
                        handleClose();
                        handleClickLogout();
                    }}>Sign Out</p>
                </div>
            </Menu>
        </div>
    );
}

export default MenuButton