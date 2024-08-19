import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    search: yup
        .string()
        .trim()
});

const SearchUser = () => {
    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        const { search } = values;
        if (search.trim()) {
            navigate(`/admin/dashboard/search/${search}`);
        } else {
            navigate('/admin/dashboard');
        }
        actions.resetForm();
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },
        validationSchema: validationSchema,
        onSubmit
    });

    return (
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <InputBase
                    sx={{
                        bgcolor: 'white',
                        padding: '10px',
                        color: 'rgba(0, 0, 0, 0.9)',
                        flex: '1',
                        marginRight: '10px',
                        borderRadius: '30px', 
                    }}
                    fullWidth
                    id="search"
                    name="search"
                    placeholder="Enter search query"
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.search && Boolean(errors.search)}
                />
                <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                    Search
                </Button>
            </Box>
            {touched.search && errors.search && (
                <Typography variant="body2" color="orange" sx={{ textAlign: 'center', marginTop: '5px' }}>
                    {errors.search}
                </Typography>
            )}
        </form>
    );
};

export default SearchUser;
