import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Dropdown({ label, options, handleDropdown, value = '' }) {
    const [dropdownValue, setDropdownValue] = useState('');
    const handleChange = (event) => {
        handleDropdown(event)
        setDropdownValue(event.target.value);
    };

    useEffect(() => {
        setDropdownValue(value)
    },[])

    return (
        <div>
            <FormControl sx={{ m: 1, width: 150, mt: 1 }} size='small' style={{
                background: "transparent",
                borderRadius: '3px', border: '1px solid #232323',
                width:'180px',
                color: "#232323"
            }}>
                <Select
                    value={dropdownValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ color: '#232323', fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: '14px' }}
                >
                    {
                        options.map(option => <MenuItem value={option.value} selected={value === option.value}>{option.name}</MenuItem>)
                    }
                </Select>
            </FormControl>

        </div>
    )
}
