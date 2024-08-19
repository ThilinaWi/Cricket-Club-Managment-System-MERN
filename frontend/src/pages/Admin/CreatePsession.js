import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { pSessionTypeLoadAction } from '../../redux/actions/pSessionTypeAction';
import { registerApSessionAction } from '../../redux/actions/pSessionAction';

 


const validationSchema = yup.object({
    practiceSessionName: yup
        .string('Enter a job title')
        .required('title is required'),
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
    practiceSessionType: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const CreatePsession = () => {
    const dispatch = useDispatch();

    
    //job type
    useEffect(() => {
        dispatch(pSessionTypeLoadAction());
    }, []);

    const { sessionType } = useSelector(state => state.sessionTypeAll);  //get from store

    const formik = useFormik({
        initialValues: {
            practiceSessionName: '',
            description: '',
            date: '',
            location: '',
            practiceSessionType: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(registerApSessionAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h1 className="font-poppins font-normal text-lg mb-5">Register Practice Session</h1>
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

                        <Button fullWidth variant="contained" type='submit' >Create Practice Session</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default CreatePsession