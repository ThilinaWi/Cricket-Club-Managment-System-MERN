import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const SelectComponent = ({ handleChangeMainRole, MainRole }) => {

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">MainRole</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={MainRole}
                    label="position"
                    onChange={handleChangeMainRole}
                >
                    <MenuItem value="">All</MenuItem>
                
                            <MenuItem key="Batsman" value="Batsman">Batsman</MenuItem>
                            <MenuItem key="Bowler" value="Bowler">Bowler</MenuItem>

                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectComponent