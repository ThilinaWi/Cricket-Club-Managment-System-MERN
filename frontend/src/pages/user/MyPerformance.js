import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material'; 
import { SinglePerformanceLoadAction } from '../../redux/actions/performanceAction';
import React, { useEffect, useState } from 'react';

const MyPerformance = () => {
  const { user } = useSelector(state => state.userProfile);
  const { playerP } = useSelector(state => state.loadSinglePerformances);
  const { palette } = useTheme();

  const dispatch = useDispatch();


  React.useEffect(() => {
      dispatch(SinglePerformanceLoadAction('663496a2b357e442eaf6fb27'));
    
  }, ['663496a2b357e442eaf6fb27', dispatch]);

  

  return (
    <> 
      <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
        <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
          <CardContent>
           <center> <Typography sx={{ fontSize: 24 }} color="#fafafa" gutterBottom>
              My Performance
            </Typography></center>
            <center> <Typography sx={{ fontSize: 20 }} color="#fafafa" gutterBottom>
              Main Informations
            </Typography></center>
           
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Main Role               : {playerP && playerP.MainRole}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Matches                 : {playerP && playerP.Matches}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Innings                 : {playerP && playerP.Inns}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Batting Position        : {playerP && playerP.No}
            </Typography>

            <center> <Typography sx={{ fontSize: 20 }} color="#fafafa" gutterBottom>
              Batting Performance
            </Typography></center>

            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Runs: {playerP && playerP.Runs}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Highest Score: {playerP && playerP.HS}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Average: {playerP && playerP.Ave}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Strike Rate: {playerP && playerP.SR}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Hundreds: {playerP && playerP.Hundreds}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Fifties: {playerP && playerP.Fifties}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Sixes: {playerP && playerP.Sixes}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Fours: {playerP && playerP.Fours}
            </Typography>

            <center> <Typography sx={{ fontSize: 20 }} color="#fafafa" gutterBottom>
              Bowling Performance
            </Typography></center>

            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Wickets: {playerP && playerP.Wickets}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Overs: {playerP && playerP.Overs}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Runs in Bowling: {playerP && playerP.RunsInB}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Main Overs: {playerP && playerP.MainOvers}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Bowling Average: {playerP && playerP.BAvg}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Economy: {playerP && playerP.Econ}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Bowling Strike Rate: {playerP && playerP.BowlingSR}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Best Bowling in Innings: {playerP && playerP.BBI}
            </Typography>

            <center> <Typography sx={{ fontSize: 20 }} color="#fafafa" gutterBottom>
              Fielding Performance
            </Typography></center>

            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Best Bowling in Match: {playerP && playerP.BBM}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Catches: {playerP && playerP.Ct}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Run outs: {playerP && playerP.Runouts}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Stumps: {playerP && playerP.St}
            </Typography>

          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default MyPerformance;