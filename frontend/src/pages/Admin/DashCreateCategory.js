import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { createEventTypeAction } from '../../redux/actions/eventTypeAction';



const validationSchema = yup.object({

    eventTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateCategory = () => {

    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            eventTypeName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createEventTypeAction(values))
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Create a Category
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="eventTypeName"
                            label="category"
                            name='eventTypeName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="category name"
                            value={formik.values.eventTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.eventTypeName && Boolean(formik.errors.eventTypeName)}
                            helperText={formik.touched.eventTypeName && formik.errors.eventTypeName}
                        />


                        <Button fullWidth variant="contained" type='submit' >Create category</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateCategory