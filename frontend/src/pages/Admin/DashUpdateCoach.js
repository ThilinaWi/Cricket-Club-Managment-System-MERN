import React, { useEffect, useState } from 'react';
import { Avatar, Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { coachUpdateAction, singleCoachAction } from '../../redux/actions/coachActions';
import { COACH_UPDATE_RESET } from '../../redux/constant/coachConstant';


const validationSchema = yup.object({

  name: yup
      .string('Enter Name'),
  //    .required('Name is required'),
  age: yup
      .number('Enter Age'),
  //    .required('Age is required'),
  gender: yup
      .string('Enter Gender'),
  //    .required('gender is required'),
  age_group: yup
      .string('Enter a Age Group'),
  //    .required('Age Group is required'),
  tp: yup
     .string()
  //  .matches(/^[0-9]{10}$/, 'Please add a valid Phone Number')
    ,
  level: yup
      .string('Enter Level'),
  //    .required('Level is required'),
  description: yup
      .string('Enter a description')

});

const DashUpdateCoach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {coach, loading} = useSelector(state => state.singlcoach);
  const {success} = useSelector(state => state.coachUpdate);

  useEffect(() => {
    if(id){
        dispatch(singleCoachAction(id));
    }
    }, [id]);

  const formik = useFormik({
    initialValues: {
      _id: coach?._id,
      name: coach?.name,
      age: coach?.age,
      gender: coach?.gender,
      tp: coach?.tp,
      level: coach?.level,
      age_group: coach?.age_group,
      description: coach?.description,
     
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      dispatch(coachUpdateAction(values));
      actions.resetForm();
    }
  });

    useEffect(() => {
        if(success && success === true){
            setTimeout(() => {
                dispatch({type: COACH_UPDATE_RESET});
                navigate('/coach');
            }, 800);
        }
    }, [success && success]);

  return (
    <>
      <Box sx={{  height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
          <Box sx={{ width: '80%', maxWidth: '400px' }}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center',pb: 3 }}>
                            Edit Coach
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="name"
              label="Name"
              name='name'
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
              <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="age"
              label="Age"
              name='age'
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
       

            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="tp"
                label="Phone Number"
                name='tp'
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="Phone Number"
                value={formik.values.tp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tp && Boolean(formik.errors.tp)}
                helperText={formik.touched.tp && formik.errors.tp}
            />


         <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
                labelId="level-label"
                id="level"
                name="level"
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.level && Boolean(formik.errors.level)}
            >
                             <MenuItem value='level 1'>L-1 </MenuItem>
                             <MenuItem value='Level 2'>L-2 </MenuItem>
                             <MenuItem value='Level 3'>L-3 </MenuItem>

            </Select>

                {formik.touched.level && formik.errors.level && (
                <Box sx={{ color: 'error.main', mt: 1 }}>{formik.errors.level}</Box>
            )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="age_group-label">Age Group</InputLabel>
            <Select
                labelId="age_group-label"
                id="age_group"
                name="age_group"
                value={formik.values.age_group}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age_group && Boolean(formik.errors.age_group)}
            > 
                         <MenuItem value='Under-11'>Under-11</MenuItem>
                         <MenuItem value='Under-13'>Under-13</MenuItem>
                         <MenuItem value='Under-15'>Under-15</MenuItem>
                         <MenuItem value='Under-18'>Under-18</MenuItem>
                         <MenuItem value='Under-21'>Under-21</MenuItem>
             </Select>

                {formik.touched.age_group && formik.errors.age_group && (
                <Box sx={{ color: 'error.main', mt: 1 }}>{formik.errors.age_group}</Box>
            )}
        </FormControl>
        
     
            <TextField
                sx={{ mb: 3 }}
                fullWidth
                id="description"
                label="Description"
                name='description'
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

         <FormControl>
         <RadioGroup  
               sx={{ my: 0.001 }}
               defaultValue="male"
               name="gender"
               label='Gender'
               placeholder='Gender'
               row   
               value={formik.values.gender}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.gender && Boolean(formik.errors.gender)}
               helperText={formik.touched.gender && formik.errors.gender}   
          >
                    <FormControlLabel control={<Radio size="small"/>} label='Male' value ='male'/>
                    <FormControlLabel control={<Radio size="small"/>} label='Female' value ='female'/>
                    <FormControlLabel control={<Radio size="small"/>} label='Other' value ='other'/>
         </RadioGroup>
         </FormControl>




           <Button fullWidth variant="contained" type='submit'>Submit</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashUpdateCoach;
