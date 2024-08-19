import React, { useEffect, useState } from 'react'
import { Box, Button, Pagination, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { allCoachAction, deleteCoachAction } from '../../redux/actions/coachActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const DashCoaches = () => {

    const { coaches } = useSelector(state => state.allCoach);
    const dispatch = useDispatch();
    let data = [];
    data = (coaches !== undefined && coaches.length > 0) ?coaches :[]

    useEffect(() => {
        dispatch(allCoachAction());
    }, []); 
    
    const { success: deleteSuccess } = useSelector(state => state.deleteCoach);

    const deleteCoachById = (e, id) => {
        if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
            dispatch(deleteCoachAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(allCoachAction())
            }
        }
    }


    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'tp', headerName: 'Telephone', width: 150 },
        { field: 'level', headerName: 'Level', width: 150 },
        { field: 'age_group', headerName: 'Age Group', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px"  }}>
                     <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/coach/update/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteCoachById(e, values.row._id)} variant="contained" color="error"startIcon={<DeleteIcon/>}>Delete</ Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All Coach List
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddIcon />}><Link to ="/coach/add"className=''>Add new Coach</Link></Button>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'black',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        //theme.palette.mode === 'light' ? grey[200] : grey[900],
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: '#ffffff'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>
                {/* <Stack spacing={2} >
              <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
          </Stack> */}

            </Box>

        </>
    )

}

export default DashCoaches