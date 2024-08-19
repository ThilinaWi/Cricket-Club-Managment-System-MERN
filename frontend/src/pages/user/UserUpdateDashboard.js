import React, { useEffect, useState } from 'react';
import { Avatar, Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { singleUserAction, userUpdateAction } from '../../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../../redux/constant/userConstant';



const validationSchema = yup.object({
  firstName: yup
    .string('Enter your First Name')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your Last Name')
    .required('Last Name is required'),
  dateOfBirth: yup.date().max(new Date(), 'Date of birth cannot be in the future'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Please add a valid Phone Number'),
  guardianName: yup.string(),
  guardianRelation: yup.string(),
  guardianTp: yup.string().matches(/^[0-9]{10}$/, 'Please add a valid Phone Number'),
});

const UserUpdateDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {user, loading} = useSelector(state => state.singleUser);
  const {success} = useSelector(state => state.userUpdate);

  useEffect(() => {
    if(id){
        dispatch(singleUserAction(id));
    }
    }, [id]);

  const formik = useFormik({
    initialValues: {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      battingStyle: user?.battingStyle,
      bowlingStyle: user?.bowlingStyle,
      guardianName: user?.guardianName,
      guardianRelation: user?.guardianRelation,
      guardianTp: user?.guardianTp,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      dispatch(userUpdateAction(values));
      actions.resetForm();
    }
  });

    useEffect(() => {
        if(success && success === true){
            setTimeout(() => {
                dispatch({type: USER_UPDATE_RESET});
                navigate('/user/info');
            }, 800);
        }
    }, [success && success]);

  return (
    <>
      <Box sx={{  height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
          <Box sx={{ width: '80%', maxWidth: '400px' }}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center',pb: 3 }}>
                            Edit User
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="firstName"
              label="First Name"
              name='firstName'
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
              <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="lastName"
              label="Last Name"
              name='lastName'
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              name='dateOfBirth'
              type="date"
              InputLabelProps={{
                  shrink: true,
              }}
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />

          <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="email"
              label="Email"
              name='email'
              InputLabelProps={{
                  shrink: true,
              }}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
          />

            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name='phoneNumber'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="battingStyle-label">Batting Style</InputLabel>
            <Select
                labelId="battingStyle-label"
                id="battingStyle"
                name="battingStyle"
                value={formik.values.battingStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.battingStyle && Boolean(formik.errors.battingStyle)}
            >
                <MenuItem value="Right-handed">Right-handed</MenuItem>
                <MenuItem value="Left-handed">Left-handed</MenuItem>
            </Select>
            {formik.touched.battingStyle && formik.errors.battingStyle && (
                <Box sx={{ color: 'error.main', mt: 1 }}>{formik.errors.battingStyle}</Box>
            )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="bowlingStyle-label">Bowling Style</InputLabel>
            <Select
                labelId="bowlingStyle-label"
                id="bowlingStyle"
                name="bowlingStyle"
                value={formik.values.bowlingStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bowlingStyle && Boolean(formik.errors.bowlingStyle)}
            >
                <MenuItem value="Right-handed">Right-handed</MenuItem>
                <MenuItem value="Left-handed">Left-handed</MenuItem>
            </Select>
            {formik.touched.bowlingStyle && formik.errors.bowlingStyle && (
                <Box sx={{ color: 'error.main', mt: 1 }}>{formik.errors.bowlingStyle}</Box>
            )}
        </FormControl>
            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="guardianName"
                label="Guardian Name"
                name='guardianName'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Guardian Name"
                value={formik.values.guardianName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.guardianName && Boolean(formik.errors.guardianName)}
                helperText={formik.touched.guardianName && formik.errors.guardianName}
            />
            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="guardianRelation"
                label="Guardian Relation"
                name='guardianRelation'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Guardian Relation"
                value={formik.values.guardianRelation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.guardianRelation && Boolean(formik.errors.guardianRelation)}
                helperText={formik.touched.guardianRelation && formik.errors.guardianRelation}
            />
            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="guardianTp"
                label="Guardian Phone Number"
                name='guardianTp'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Guardian Phone Number"
                value={formik.values.guardianTp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.guardianTp && Boolean(formik.errors.guardianTp)}
                helperText={formik.touched.guardianTp && formik.errors.guardianTp}
            />
           <Button fullWidth variant="contained" type='submit'>Submit</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserUpdateDashboard;
