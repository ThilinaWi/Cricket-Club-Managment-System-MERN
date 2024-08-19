import React, { useEffect, useState } from 'react';
import Header from '../../component/Header'
import { Box, Button, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { PerformanceCreateAction, PerformanceDeleteAction, PerformanceLoadAction, PerformancedeleteAction, SinglePerformanceLoadAction } from '../../redux/actions/performanceAction';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import CardElement from '../../component/CardElement';
import Footer from '../../component/Footer';
import LoadingBox from '../../component/lLoadingBox';
import SelectComponent from '../../component/SelectComponnent';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';



import AddIcon from '@mui/icons-material/Add'; 
    
   
const PlayerPerformanceDash = () => {
    const {  playerPs,pages,setUniquePosition,loading}=useSelector(state => state.loadPerformances);
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const {keyword,position} = useParams();

    const [page, setPage] = useState(1);
   // const [position, setposition] = React.useState('');

useEffect(()=>{
    dispatch(PerformanceLoadAction(page, keyword,position))
},[page, keyword,position,dispatch]);

useEffect(() => {
    dispatch(PerformanceLoadAction());
}, [dispatch]);

const handleChangePosition = (e) => {
   // setposition(e.target.value);
}


const handleClick = (newId) => {

    dispatch(SinglePerformanceLoadAction(newId)); 
};

const navigate = useNavigate();
/*const deletePlayerPx = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/admin/performance/delete/${id}`);
   
        alert('successfully Deleted record!');
    } catch (error) {
        alert('Not Deleted record!');
      console.error('Error deleting player:', error);
    }
  };*/

 
  const DeletePlayerP = async (id) => {
    
    try {
        dispatch(PerformanceDeleteAction(id)); 
        navigate(0);
          alert('successfully Deleted record!');
      } catch (error) {
          alert('Not Deleted record!');
        console.error('Error deleting player:', error);
      }
};

      //pdf
      const downloadPdf = () => {
        fetch('http://localhost:9000/generate-pdf')
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "items.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => console.error('Error:', error));
      };
   
 
    return (
        <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Practice Session list
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
      <Button onClick={downloadPdf} variant='contained' color="success" >Download Performance Report</Button>
      
      <Button variant='contained' color="success" startIcon={<AddIcon />}><Link style={{ color: "white", textDecoration: "none" }} to="/user/create">Create new Performance Record</Link></Button>
      </Box>
      <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >
      <Box sx={{flex: 5, p: 2,minWidth:"80vh"}}>
                                        {

                                            loading?
                                            <LoadingBox/> :
                                            playerPs && playerPs.length===0 ?
                                            <>
                                            <Box
                                                sx={{
                                                    minHeight: '350px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                <h2>No result found!</h2>
                                            </Box>
                                        </> :
                                                    
                                                    <TableContainer component={Paper} sx={{ border: 1, borderColor: 'divider' }}>
                                                    <Table sx={{ minWidth: 180 }} aria-label="players table">
                                                        
                                                        <TableHead>
                                                        <TableRow>
                                                                <TableCell colSpan={8}><center><h1>Player Info</h1></center></TableCell>
                                                                <TableCell colSpan={7}><h2>Batting Stats</h2><center></center></TableCell>
                                                                <TableCell colSpan={9}><h1>Bowling Stats</h1><center></center></TableCell>
                                                                <TableCell colSpan={3}><h1>Fielding Stats</h1><center></center></TableCell>
                                                        </TableRow>    
                                                            <TableRow>
                                                                <TableCell>Player ID</TableCell>
                                                                <TableCell>Last Name</TableCell>
                                                                <TableCell>Initials</TableCell>
                                                                <TableCell>MainRole</TableCell>
                                                                <TableCell>Matches</TableCell>
                                                                <TableCell>Innings</TableCell>
                                                                <TableCell>Position</TableCell>
                                                                <TableCell>Runs</TableCell>
                                                                <TableCell>Highest Score</TableCell>
                                                                <TableCell>Average</TableCell>
                                                                <TableCell>Strike Rate</TableCell>
                                                                <TableCell>Hundreds</TableCell>
                                                                <TableCell>Fifties</TableCell>
                                                                <TableCell>Sixes</TableCell>
                                                                <TableCell>Fours</TableCell>
                                                                <TableCell>Wickets</TableCell>
                                                                <TableCell>Overs</TableCell>
                                                                <TableCell>Runs In Bowling</TableCell>
                                                                <TableCell>Main Overs</TableCell>
                                                                <TableCell>BAvg</TableCell>
                                                                <TableCell>Economy</TableCell>
                                                                <TableCell>BowlingSR</TableCell>
                                                                <TableCell>BBI</TableCell>
                                                                <TableCell>BBM</TableCell>
                                                                <TableCell>Catches</TableCell>
                                                                <TableCell>Runouts</TableCell>
                                                                <TableCell>Stumpings</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {playerPs && playerPs.map((batp, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell >{batp.PlayerId}</TableCell>
                                                                    <TableCell>{batp.LastName}</TableCell>
                                                                    <TableCell>{batp.Inits}</TableCell>
                                                                    <TableCell>{batp.MainRole}</TableCell>
                                                                    <TableCell>{batp.Matches}</TableCell>
                                                                    <TableCell>{batp.Inns}</TableCell>
                                                                    <TableCell>{batp.No}</TableCell>
                                                                    <TableCell>{batp.Runs}</TableCell>
                                                                    <TableCell>{batp.HS}</TableCell>
                                                                    <TableCell>{batp.Ave}</TableCell>
                                                                    <TableCell>{batp.SR}</TableCell>
                                                                    <TableCell>{batp.Hundreds}</TableCell>
                                                                    <TableCell>{batp.Fifties}</TableCell>
                                                                    <TableCell>{batp.Sixes}</TableCell>
                                                                    <TableCell>{batp.Fours}</TableCell>
                                                                    <TableCell>{batp.Wickets}</TableCell>
                                                                    <TableCell>{batp.Overs}</TableCell>
                                                                    <TableCell>{batp.RunsInB}</TableCell>
                                                                    <TableCell>{batp.MainOvers}</TableCell>
                                                                    <TableCell>{batp.BAvg}</TableCell>
                                                                    <TableCell>{batp.Econ}</TableCell>
                                                                    <TableCell>{batp.BowlingSR}</TableCell>
                                                                    <TableCell>{batp.BBI}</TableCell>
                                                                    <TableCell>{batp.BBM}</TableCell>
                                                                    <TableCell>{batp.Ct}</TableCell>
                                                                    <TableCell>{batp.Runouts}</TableCell>
                                                                    <TableCell>{batp.St}</TableCell>

                                                                    <TableCell>
                                                                    <Button onClick={() => handleClick(batp._id)}variant="contained" color="primary"><Link style={{ textDecoration: "none"}} to="/user/edit">Update</Link>
                                                                        
                                                                        </Button>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button  onClick={() => DeletePlayerP(batp._id)}  variant="contained" style={{ backgroundColor: 'red', color: 'white' }}><Link style={{ textDecoration: "none"}} to="/admin/PPerformance">Delete</Link>
                                                                        
                                                                        </Button>
                                                                    </TableCell>
           
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>

                                                    <br/>
                                   
                                
                            
                                                 <br/> 
                                                </TableContainer>

                                                

                                        }

                                       

                                    </Box>
                                    <Box sx={{ pb: 2, display: "flex", justifyContent: "left" }}>
                                    <Stack spacing={4} >
                                            <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)}  />
                                    </Stack>
                                    </Box>
                                 
                                    
                                <br />
                                </Paper>   

                                
                                   
        </Box>
    )
}

export default PlayerPerformanceDash

