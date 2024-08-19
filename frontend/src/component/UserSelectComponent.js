import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const UserSelectComponent = ({handleChangeStyle, battingStyle }) => {

    const { users } = useSelector(state => state.allUsers);
    const { palette } = useTheme();

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bowling Style</InputLabel>
                <Select
                    inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: palette.secondary.main
                                }
                            }
                        }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={battingStyle}
                    label="Bowling Style"
                    onChange={handleChangeStyle}
                >
                    <MenuItem value="">All</MenuItem>
                    {
                        users && users.map(user => (
                            <MenuItem key={user._id} value={user._id}>{user.battingStyle}</MenuItem>
                        ))
                    }


                </Select>
            </FormControl>
        </Box>
    )
}

export default UserSelectComponent;