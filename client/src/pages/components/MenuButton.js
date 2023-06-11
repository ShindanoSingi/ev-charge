import React from 'react';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { AiOutlineMenu } from 'react-icons/ai';
import { setShowCard } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function MenuButton() {
    const { showCard } = useSelector((state) => state.userReducer);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className=''>
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
                    <div className=''>
                        <p className='bg-gray-200 px-2 w-full hover:bg-black hover:text-white border-b-2 border-gray-400' onClick={handleClose}>My Account</p>
                        <Link to='/signup'>
                            <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full border-b-2 border-gray-400' onClick={handleClose}>Sign Up</p>
                        </Link>
                        <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full border-b-2 border-gray-400' onClick={handleClose}>Sign In</p>
                        <p className='bg-gray-200 hover:bg-black hover:text-white px-2 w-full ' onClick={handleClose}>Sign Out</p>
                    </div>
                    {/* <div>
                        <li className='bg-gray-200 px-2 w-full' onClick={handleClose}>My Account</li><hr className='bg-gray-700' />
                        <Link to='/signup'>
                            <li className='bg-gray-200 px-2 w-full' onClick={handleClose}>Sign Up</li><hr className='bg-gray-800' />
                        </Link>
                        <li className='bg-gray-200 px-2 w-full' onClick={handleClose}>Sign In</li><hr className='bg-gray-700' />
                        <li className='bg-gray-200 px-2 w-full' onClick={handleClose}>Sign Out</li>
                    </div> */}

                </Menu>
            </div>
        </div>
    );
}

export default MenuButton