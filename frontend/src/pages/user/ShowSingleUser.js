import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { singleUserAction } from '../../redux/actions/userActions';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import man from '../../images/man.png';

const ShowSingleUser = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, loading } = useSelector(state => state.singleUser);
    useEffect(() => {
        dispatch(singleUserAction(id));
    }, [id]);


    return (
        <>
            <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
                <Card sx={{ minWidth: 275, bgcolor: 'white' }}>
                    <CardContent>
                    {/* <Typography sx={{ fontSize: 16, color: "#000" }} gutterBottom>
                                Personal Info
                            </Typography> */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <Avatar src={man} alt="Profile Picture" sx={{ width: 100, height: 100, mr: 2 }} />
                        </Box>
                        <hr style={{ marginBottom: "30px" }} />
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            First name: {user && user?.firstName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Last name: {user && user?.lastName}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            E-mail:  {user && user?.email}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Phone No:  {user && user?.phoneNumber}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Batting Style: {user && user.battingStyle}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ color: "#000" }} >
                            Bawling Style: {user && user.bowlingStyle}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default ShowSingleUser;