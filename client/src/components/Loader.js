import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <div className='bg-black h-screen flex items-center justify-center text-'>
            <div>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>

        </div>

    );
}