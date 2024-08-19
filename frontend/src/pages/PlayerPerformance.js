import React, { useEffect, useState } from 'react';
import Navbar from '../component/NavBar'
import Header from '../component/Header'
import { Box, Button, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { PerformanceLoadAction } from '../redux/actions/performanceAction';
import { Link, useParams } from 'react-router-dom';
import CardElement from '../component/CardElement';
import Footer from '../component/Footer';
import LoadingBox from '../component/lLoadingBox';
import SelectComponent from '../component/SelectComponentJ';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderJ from '../component/HeaderJ';

const PlayerPerformance = () => {
    
    const {  playerPs,pages,setUniquePosition,loading}=useSelector(state => state.loadPerformances);
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const {keyword,position} = useParams();

    const [page, setPage] = useState(1);
    const [MainRole, setMainRole] = React.useState('');

useEffect(()=>{
    dispatch(PerformanceLoadAction(page, keyword,MainRole))
},[page, keyword,MainRole,dispatch]);

useEffect(() => {
    dispatch(PerformanceLoadAction());
}, [dispatch]);

const handleChangeMainRole = (e) => {
    setMainRole(e.target.value);
}

console.log(playerPs); 
if (loading) return <div>Loading...</div>;


    return(
        
        <>

            <Box  sx={{bgcolor: "#fafafa", minHeight: "100vh", minWidth: "100vw"}}>
                <Navbar/>
                <HeaderJ/>
                
                                    <Box sx={{ width: 200,p: 2}}>
                                        <Card  sx={{ minWidth: 10, mb: 3, mt: 3, p: 2 }}>
                                            <Box sx={{pb:2}}>
                                                <Typography component="h4" sx={{color: palette.secondary.main, fontWeight: 600}}>
                                                    Filter Pperfromance by category
                                                </Typography>

                                            </Box>
                                            <SelectComponent handleChangeMainRole={handleChangeMainRole} MainRole={MainRole} />
                                        </Card>
                                           
                                    </Box>
                                    <Box sx={{flex: 5, p: 2,minWidth:"100%"}}>
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
                                                                <TableCell colSpan={8}><center>Player Info</center></TableCell>
                                                                <TableCell colSpan={7}><center>Batting Stats</center></TableCell>
                                                                <TableCell colSpan={9}><center>Bowling Stats</center></TableCell>
                                                                <TableCell colSpan={3}><center>Fielding Stats</center></TableCell>
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
                                                                    <TableCell>{batp.PlayerId}</TableCell>
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
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>

                                                    <br/>
                                                </TableContainer>
                                        }

                                       
                                    <br />
                                    </Box>
                                    <Stack spacing={6}>
                                            <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                                    </Stack>
                                    <br />

                <Footer/>
        </Box>
       
           
        </>
     
    )
}

export default PlayerPerformance;