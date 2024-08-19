import React, { useEffect, useState } from 'react';
import { Avatar, Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, IconButton, InputAdornment} from '@mui/material';
import Footer from '../component/Footer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/NavBar';
import { userSignUpAction } from '../redux/actions/userActions';
import backgroundImage from '../images/Register.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const validationSchema = yup.object({
    firstName: yup
      .string('Enter your First Name')
      .required('First Name is required'),
    lastName: yup
      .string('Enter your Last Name')
      .required('Last Name is required'),
    dateOfBirth: yup.date().max(new Date(), 'Date of birth cannot be in the future'),
    gender: yup.string(),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 6 characters').required('Password is required'),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Please add a valid Phone Number').required('Phone Number is required'),
    cricketExperience: yup.string(),
    battingStyle: yup.string(),
    bowlingStyle: yup.string(),
    wicketkeepingExperience: yup.boolean(),
    guardianName: yup.string(),
    guardianRelation: yup.string(),
    guardianTp: yup.string().matches(/^[0-9]{10}$/, 'Please add a valid Phone Number'),
    preferredPlayingPosition: yup.string()
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.signUp);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            email: '',
            password: '',
            phoneNumber: '',
            cricketExperience: '',
            battingStyle: '',
            bowlingStyle: '',
            wicketkeepingExperience: false,
            guardianName: '',
            guardianRelation: '',
            guardianTp: '',
            preferredPlayingPosition: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate();
        }
    }, [isAuthenticated]);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <>
            <Navbar />
            <Box sx={{ height: '120vh', display: "flex", alignItems: "center", justifyContent: "center" ,mb: 75 }} className = "mt-7">
                <Box  onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ width: '100%',maxWidth: '400px' }}>
                        <Avatar sx={{ m: 2, bgcolor: "primary.main", mb: 3 }}>
                        </Avatar>
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

                        <FormControl sx={{ mb: 3 }} fullWidth>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                fullWidth
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select>
                        </FormControl>

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
            id="password"
            label="Password"
            name='password'
            type={showPassword ? 'text' : 'password'}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
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

                        <FormControl sx={{ mb: 3 }} fullWidth>
                            <InputLabel id="cricket-experience-label">Cricket Experience</InputLabel>
                            <Select
                                labelId="cricket-experience-label"
                                id="cricketExperience"
                                name="cricketExperience"
                                value={formik.values.cricketExperience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cricketExperience && Boolean(formik.errors.cricketExperience)}
                                fullWidth
                            >
                                <MenuItem value="Beginner">Beginner</MenuItem>
                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                <MenuItem value="Advanced">Advanced</MenuItem>
                            </Select>
                        </FormControl>

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

                        <FormControlLabel
                            control={<Checkbox
                                id="wicketkeepingExperience"
                                name="wicketkeepingExperience"
                                checked={formik.values.wicketkeepingExperience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                color="primary"
                            />}
                            label="Wicketkeeping Experience"
                            sx={{ mb: 3 }}
                        />

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

                        <FormControl sx={{ mb: 3 }} fullWidth>
                            <InputLabel id="preferred-playing-position-label">Preferred Playing Position</InputLabel>
                            <Select
                                labelId="preferred-playing-position-label"
                                id="preferredPlayingPosition"
                                name="preferredPlayingPosition"
                                value={formik.values.preferredPlayingPosition}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.preferredPlayingPosition && Boolean(formik.errors.preferredPlayingPosition)}
                                fullWidth
                            >
                                <MenuItem value="Batsman">Batsman</MenuItem>
                                <MenuItem value="Bowler">Bowler</MenuItem>
                                <MenuItem value="All-rounder">All-rounder</MenuItem>
                            </Select>
                        </FormControl>

                        <Button fullWidth variant="contained" type='submit'>Register</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Register;
