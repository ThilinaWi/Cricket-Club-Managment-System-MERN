import React, { useEffect, useState } from 'react'
import { Box, Button, Pagination, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction, deleteUserAction } from '../../redux/actions/userActions';
import DeleteIcon from '@mui/icons-material/Delete';

const DashUsers = () => {

    const { pages } = useSelector(state => state.allUsers);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction(page));
    }, [page]);

    const { success: deleteSuccess } = useSelector(state => state.deleteUser);
    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = (e, id) => {
        if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
            dispatch(deleteUserAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(allUserAction())
            }
        }
    }

    const columns = [
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD')
            )
        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px"  }}>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error"startIcon={<DeleteIcon/>}>Delete</ Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All Players
                </Typography>
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
                <Stack spacing={2} >
              <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
          </Stack>

            </Box>

        </>
    )
}

export default DashUsers