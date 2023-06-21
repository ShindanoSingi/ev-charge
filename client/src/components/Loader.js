import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <div className='bg-black h-screen flex items-center justify-center text-'>
            <div>
                <Box className="flex flex-col justify-center items-center gap-4">
                    <h1 className='text-gray-400 text-xl'>Please signin; then add your stations!</h1>
                    <CircularProgress />
                </Box>
            </div>

        </div>

    );
}