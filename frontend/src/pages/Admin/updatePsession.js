import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { pSessionTypeLoadAction } from '../../redux/actions/pSessionTypeAction';
import { editSinglePsessionAction, singlepSessionLoadAction } from '../../redux/actions/pSessionAction';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PSESSION_RESET } from '../../redux/constant/pSessionConstant';



const validationSchema = yup.object({
    practiceSessionName: yup
        .string('Enter a Practice Session name')
        .required('Practice Session name is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    date: yup
        .date('Enter a date')
        .required('Date is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    available: yup
        .boolean('Add availability')
        .required('availability is required'),
    practiceSessionType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const UpdatepSession = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    //job type
    useEffect(() => {
        dispatch(pSessionTypeLoadAction());
        if (id) {
            dispatch(singlepSessionLoadAction(id));
        }
    }, [id]);


    const { sessionType } = useSelector(state => state.sessionTypeAll);
    const { session, loading } = useSelector(state => state.singlepSession);  //session get from controller
    const { success } = useSelector(state => state.updatepSession);

    const formik = useFormik({
        initialValues: {
            _id: session?._id,
            practiceSessionName: session?.practiceSessionName,
            description: session?.description,
            date: session?.date,
            location: session?.location,
            available: session?.available,
            practiceSessionType: session?.practiceSessionType?._id,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(editSinglePsessionAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //redirect after successfull update
    useEffect(() => {
        if (success && success === true) {
            setTimeout(() => {
                dispatch({ type: UPDATE_PSESSION_RESET })
                navigate('/admin/psessions');
            }, 800)
        }
    }, [success && success]);



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h1 className="font-poppins font-medium text-3xl mb-9">Edit Practice Session</h1>
                        {/* <Typography variant="h5" component="h2" sx={{ pb: 3 }} className="font-mono">
                            Edit Practice Session
                        </Typography> */}
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="practiceSessionName"
                            label="practiceSessionName"
                            name='practiceSessionName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Session Name"
                            value={formik.values.practiceSessionName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.practiceSessionName && Boolean(formik.errors.practiceSessionName)}
                            helperText={formik.touched.practiceSessionName && formik.errors.practiceSessionName}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="date"
                            name="date"
                            label="Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.date}  // Use formik values directly for the value
                            onChange={(e) => formik.setFieldValue('date', e.target.value)}  // Set formik field value on change
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="practiceSessionType"
                            id="practiceSessionType"
                            select
                            label="Category"
                            value={formik.values.practiceSessionType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.practiceSessionType && Boolean(formik.errors.practiceSessionType)}
                            helperText={formik.touched.practiceSessionType && formik.errors.practiceSessionType}
                        >
                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {sessionType && sessionType.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.practiceSessionTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit' >Edit Practice Session</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default UpdatepSession