import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses,GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { eventTypeLoadAction ,deleteSingleEventTypeAction} from '../../redux/actions/eventTypeAction';

import moment from 'moment'


const DashCategory = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventTypeLoadAction())
    }, []);

    const { success: deleteSuccess } = useSelector(state => state.deleteEvent);
    const { eventType, loading } = useSelector(state => state.eventTypeAll);
    let data = [];
    data = (eventType !== undefined && eventType.length > 0) ? eventType : []

  // delete a event by id
  const deleteEventCategoryById = (e, type_id) => {
    if (window.confirm(`You really want to delete product ID: "${type_id}" ?`)) {
        dispatch(deleteSingleEventTypeAction(type_id));
        if (deleteSuccess && deleteSuccess === true) {
            dispatch(eventTypeLoadAction(type_id))
        }
    }
}

    const columns = [

        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'eventTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Create At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )

        },

       {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                   
                    < Button onClick={(e) => deleteEventCategoryById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Events category
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}><Link style={{ color: "white", textDecoration: "none" }} to='/admin/category/create'>Create category</Link></ Button>
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
                      /*  rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection*/
                    // components={{ Toolbar: GridToolbarExport }}
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default DashCategory