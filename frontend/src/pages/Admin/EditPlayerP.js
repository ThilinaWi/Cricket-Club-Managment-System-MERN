import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const validationSchema = yup.object({
});

const EditBattingForm = () => {
  const navigate = useNavigate();
  const { playerP } = useSelector(state => state.loadSinglePerformances);

  const formik = useFormik({
    initialValues: {
      PlayerId: '',
      LastName: '', 
      Inits: '', 
      MainRole: '',  
      Matches: '', 
      Inns: '',
      No: '',  
      Runs: 0, 
      HS: 0, 
      Ave: 0, 
      SR: 0,        
      Hundreds: 0,
      Fifties: 0, 
      Sixes: 0,  
      Fours: 0,  
      Wickets:0,   
      Overs:0,   
      RunsInB:0, 
      MainOvers:0, 
      BAvg:0, 
      Econ:0, 
      BowlingSR:0,
      BBI:0,  
      BBM:0, 
      Ct:0, 
      Runouts:0,
      St:0
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`http://localhost:9000/api/admin/performance/update/${playerP._id}`, values);
        console.log(res.data);
        navigate("/admin/PPerformance");
        alert('Successfully Updated!');
      } catch (err) {
        console.error("Error updating record:", err);
        alert('Failed to update record!');
      }
    },
  });

  useEffect(() => {
    if (playerP) {
      formik.setValues({ ...playerP });
    }
  }, [playerP, formik.setValues]);

  return (
    <center>
<Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>

<Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <Typography variant="h6">Edit Player Performance</Typography>
          
          <TextField
            fullWidth
            id="PlayerId"
            name="PlayerId"
            label="Player ID"
            value={formik.values.PlayerId}
            onChange={formik.handleChange}
            error={formik.touched.PlayerId && Boolean(formik.errors.PlayerId)}
            helperText={formik.touched.PlayerId && formik.errors.PlayerId}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="LastName"
            name="LastName"
            label="Last Name"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
            helperText={formik.touched.LastName && formik.errors.LastName}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Inits"
            name="Inits"
            label="Initials"
            value={formik.values.Inits}
            onChange={formik.handleChange}
            error={formik.touched.Inits && Boolean(formik.errors.Inits)}
            helperText={formik.touched.Inits && formik.errors.Inits}
            sx={{ mb: 2 }}
          />


    
         <select fullWidth
         id="MainRole"
         name="MainRole"
         label="Main Role"
         value={formik.values.MainRole}
         onChange={formik.handleChange}
         error={formik.touched.MainRole && Boolean(formik.errors.MainRole)}
         helperText={formik.touched.MainRole && formik.errors.MainRole}
         sx={{ mb: 2 }}>
         <option value="">Select a MainRole</option>
         <option value="Bowler">Bowler</option>
         <option value="Batsman">Batsman</option>
     </select>
           <br></br>
        <TextField
            fullWidth
            id="Matches"
            name="Matches"
            label="Matches"
            value={formik.values.Matches}
            onChange={formik.handleChange}
            error={formik.touched.Matches && Boolean(formik.errors.Matches)}
            helperText={formik.touched.Matches && formik.errors.Matches}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="Inns"
            name="Inns"
            label="Inns"
            value={formik.values.Inns}
            onChange={formik.handleChange}
            error={formik.touched.Inns && Boolean(formik.errors.Inns)}
            helperText={formik.touched.Inns && formik.errors.Inns}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="No"
            name="No"
            label="Batting posision"
            value={formik.values.No}
            onChange={formik.handleChange}
            error={formik.touched.No && Boolean(formik.errors.No)}
            helperText={formik.touched.No && formik.errors.No}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="Runs"
            name="Runs"
            label="Runs"
            value={formik.values.Runs}
            onChange={formik.handleChange}
            error={formik.touched.Runs && Boolean(formik.errors.Runs)}
            helperText={formik.touched.Runs && formik.errors.Runs}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="HS"
            name="HS"
            label="Heighest Score"
            value={formik.values.HS}
            onChange={formik.handleChange}
            error={formik.touched.HS && Boolean(formik.errors.HS)}
            helperText={formik.touched.HS && formik.errors.HS}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="Ave"
            name="Ave"
            label="Average"
            value={formik.values.Ave=(formik.values.Runs/formik.values.Inns).toFixed(3)}
            onChange={formik.handleChange}
            error={formik.touched.Ave && Boolean(formik.errors.Ave)}
            helperText={formik.touched.Ave && formik.errors.Ave}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="SR"
            name="SR"
            label="Strike Rate"
            value={formik.values.SR}
            onChange={formik.handleChange}
            error={formik.touched.SR && Boolean(formik.errors.SR)}
            helperText={formik.touched.SR && formik.errors.SR}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Hundreds"
            name="Hundreds"
            label="Hundreds"
            value={formik.values.Hundreds}
            onChange={formik.handleChange}
            error={formik.touched.Hundreds && Boolean(formik.errors.Hundreds)}
            helperText={formik.touched.Hundreds && formik.errors.Hundreds}
            sx={{ mb: 2 }}
          />


        <TextField
            fullWidth
            id="Fifties"
            name="Fifties"
            label="Fifties"
            value={formik.values.PlaFiftieserId}
            onChange={formik.handleChange}
            error={formik.touched.Fifties && Boolean(formik.errors.Fifties)}
            helperText={formik.touched.Fifties && formik.errors.Fifties}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Sixes"
            name="Sixes"
            label="Sixes"
            value={formik.values.Sixes}
            onChange={formik.handleChange}
            error={formik.touched.Sixes && Boolean(formik.errors.Sixes)}
            helperText={formik.touched.Sixes && formik.errors.Sixes}
            sx={{ mb: 2 }}
          />         
        <TextField
          fullWidth
          id="Fours"
          name="Fours"
          label="Fours"
          value={formik.values.Fours}
          onChange={formik.handleChange}
          error={formik.touched.Fours && Boolean(formik.errors.Fours)}
          helperText={formik.touched.Fours && formik.errors.Fours}
          sx={{ mb: 2 }}
        />



        <TextField
            fullWidth
            id="Wickets"
            name="Wickets"
            label="Wickets"
            value={formik.values.Wickets}
            onChange={formik.handleChange}
            error={formik.touched.Wickets && Boolean(formik.errors.Wickets)}
            helperText={formik.touched.Wickets && formik.errors.Wickets}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Overs"
            name="Overs"
            label="Overs"
            value={formik.values.Overs}
            onChange={formik.handleChange}
            error={formik.touched.Overs && Boolean(formik.errors.Overs)}
            helperText={formik.touched.Overs && formik.errors.Overs}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="RunsInB"
            name="RunsInB"
            label="Runs at Bowling"
            value={formik.values.RunsInB}
            onChange={formik.handleChange}
            error={formik.touched.RunsInB && Boolean(formik.errors.RunsInB)}
            helperText={formik.touched.RunsInB && formik.errors.RunsInB}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="MainOvers"
            name="MainOvers"
            label="Main Overs"
            value={formik.values.MainOvers}
            onChange={formik.handleChange}
            error={formik.touched.MainOvers && Boolean(formik.errors.MainOvers)}
            helperText={formik.touched.MainOvers && formik.errors.MainOvers}
            sx={{ mb: 2 }}
          />
         <TextField
            fullWidth
            id="BAvg"
            name="BAvg"
            label="Bowling Average"
            value={formik.values.BAvg}
            onChange={formik.handleChange}
            error={formik.touched.BAvg && Boolean(formik.errors.BAvg)}
            helperText={formik.touched.BAvg && formik.errors.BAvg}
            sx={{ mb: 2 }}
          />


       
        <TextField
            fullWidth
            id="Econ"
            name="Econ"
            label="Econ"
            value={formik.values.Econ}
            onChange={formik.handleChange}
            error={formik.touched.Econ && Boolean(formik.errors.Econ)}
            helperText={formik.touched.Econ && formik.errors.Econ}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="BowlingSR"
            name="BowlingSR"
            label="Bowling SR"
            value={formik.values.BowlingSR}
            onChange={formik.handleChange}
            error={formik.touched.BowlingSR && Boolean(formik.errors.BowlingSR)}
            helperText={formik.touched.BowlingSR && formik.errors.BowlingSR}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="BBI"
            name="BBI"
            label="BBI"
            value={formik.values.BBI}
            onChange={formik.handleChange}
            error={formik.touched.BBI && Boolean(formik.errors.BBI)}
            helperText={formik.touched.BBI && formik.errors.BBI}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="BBM"
            name="BBM"
            label="BBM"
            value={formik.values.BBM}
            onChange={formik.handleChange}
            error={formik.touched.BBM && Boolean(formik.errors.BBM)}
            helperText={formik.touched.BBM && formik.errors.BBM}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Ct"
            name="Ct"
            label="Ct"
            value={formik.values.Ct}
            onChange={formik.handleChange}
            error={formik.touched.Ct && Boolean(formik.errors.Ct)}
            helperText={formik.touched.Ct && formik.errors.Ct}
            sx={{ mb: 2 }}
          />
        <TextField
            fullWidth
            id="Runouts"
            name="Runouts"
            label="Run outs"
            value={formik.values.Runouts}
            onChange={formik.handleChange}
            error={formik.touched.Runouts && Boolean(formik.errors.Runouts)}
            helperText={formik.touched.Runouts && formik.errors.Runouts}
            sx={{ mb: 2 }}
          />

        <TextField
            fullWidth
            id="St"
            name="St"
            label="Stumpings"
            value={formik.values.St}
            onChange={formik.handleChange}
            error={formik.touched.St && Boolean(formik.errors.St)}
            helperText={formik.touched.St && formik.errors.St}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
            Update Player Record
          </Button>
        </Box>
      </Box>
      </Box>
    </center>
  );
};

export default EditBattingForm;