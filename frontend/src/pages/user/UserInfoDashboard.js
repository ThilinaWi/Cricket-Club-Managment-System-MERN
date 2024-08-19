import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Avatar } from '@mui/material'; 
import man from '../../images/man.png';
import UpdateIcon from '@mui/icons-material/Update';

const UserInfoDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();

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
                        <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                            Status: {user && user?.role === 0 ? "Regular user" : "Admin"}
                        </Typography>

                            {
                                user && user?.role === 1 ?
                                <>
                                </> :
                                <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                                    <Button variant="contained" component={Link} to={`/user/update/${user && user?._id}`} style={{ color: "#fff", textDecoration: "none" }}startIcon={<UpdateIcon/>}>
                                        Edit
                                    </Button>
                                    </Box>
                                </>
                            }
                        

                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default UserInfoDashboard;
