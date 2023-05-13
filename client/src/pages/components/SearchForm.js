import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

function SearchForm() {
    return (
        <div className=''>
            <div className='mb-2 w-full top-2 z-50'>
                <input placeholder="Search" className='search-input w-full p-3 pl-4 rounded-lg' />
            </div>
        </div>
    )
}

export default SearchForm