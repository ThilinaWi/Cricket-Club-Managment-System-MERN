import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleEventAction, eventLoadAction } from '../../redux/actions/eventAction';



const DashEvents = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventLoadAction())
    }, []);

    const { success: deleteSuccess } = useSelector(state => state.deleteEvent);
    const { events, loading } = useSelector(state => state.loadEvents);
    let data = [];
    data = (events !== undefined && events.length > 0) ? events : []

    // delete a event by id
    const deleteEventById = (e, id) => {
        if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
            dispatch(deleteSingleEventAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(eventLoadAction())
            }
        }
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Event ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Event title',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
        },
       /* {
            field: 'eventType',
            headerName: 'Category',
            width: 150,
            valueGetter: (data) => data.row?.eventType?.eventTypeName
        },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            valueGetter: (data) => data.row?.user?.firstName
        },*/
        {
            field: 'available',
            headerName: 'available',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))

        },

      
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/event/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteEventById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];



    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Events list
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "white", textDecoration: "none" }} to="/admin/event/create">Create Event</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                       // getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
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
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashEvents