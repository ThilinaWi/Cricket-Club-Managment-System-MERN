import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive().integer(),
  gender: yup.string().required("Gender is required"),
  age_group: yup.string().required("Age Group is required"),
  tp: yup.string().matches(/^[0-9]{10}$/, 'Please add a valid Phone Number').required('Phone Number is required'),
  level: yup.string().required("Level is required"),
  description: yup.string().min(10, "Description should be at least 25 characters long").required("Description is required"),
});

export default function AddCoach() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      tp: "",
      level: "",
      age_group: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post("http://localhost:9000/coach/add", values)
        .then(() => {
          toast.success('Coach added successfully');
          navigate('/coach');
        })
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
        });
    },
  });

  return (
    <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
      <Box component="form" onSubmit={formik.handleSubmit} className='form_style border-style'>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
            Register a Coach
          </Typography>

                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="name"
                            label="name"
                            name='name'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="First Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <TextField fullWidth
                       id="age"
                       name="age"
                       label="Age"
                       type="number"
                       value={formik.values.age}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={formik.touched.age && Boolean(formik.errors.age)}
                       helperText={formik.touched.age && formik.errors.age}
                       sx={{ mb: 3 }}
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

          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <TextField fullWidth
                       id="level"
                       name="level"
                       label="Level"
                       select
                       value={formik.values.level}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={formik.touched.level && Boolean(formik.errors.level)}
                       helperText={formik.touched.level && formik.errors.level}
                       sx={{ mb: 3 }}
            >
              <MenuItem value="Level 1">L-1</MenuItem>
              <MenuItem value="Level 2">L-2</MenuItem>
              <MenuItem value="Level 3">L-3</MenuItem>
            </TextField>
            <TextField fullWidth
                       id="age_group"
                       name="age_group"
                       label="Age Group"
                       select
                       value={formik.values.age_group}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={formik.touched.age_group && Boolean(formik.errors.age_group)}
                       helperText={formik.touched.age_group && formik.errors.age_group}
                       sx={{ mb: 3 }}
            >
              <MenuItem value="Under-11">Under-11</MenuItem>
              <MenuItem value="Under-13">Under-13</MenuItem>
              <MenuItem value="Under-15">Under-15</MenuItem>
              <MenuItem value="Under-18">Under-18</MenuItem>
              <MenuItem value="Under-21">Under-21</MenuItem>
            </TextField>
          </Box>
          <TextField fullWidth
                     id="description"
                     name="description"
                     label="Description"
                     type="text"
                     value={formik.values.description}
                     onChange={formik.handleChange}
                     error={formik.touched.description && Boolean(formik.errors.description)}
                     helperText={formik.touched.description && formik.errors.description}
                     sx={{ mb: 3 }}
          />
          <RadioGroup row
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
          >
                       <FormControlLabel control={<Radio />} label="Male" value="male" />
                       <FormControlLabel control={<Radio />} label="Female" value="female" />
                       <FormControlLabel control={<Radio />} label="Other" value="other" />
          </RadioGroup>
          <Button fullWidth variant="contained" type="submit">
            Register Coach
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

