import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const UserCardElement = ({ firstName, email, phoneNumber, bowlingStyle, battingStyle, id}) => {
    const { palette } = useTheme();
    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>

            <CardContent >
                <Typography variant="h4" component="div" sx={{ color: palette.secondary.main, fontWeight: 'bold' }}>
                    {firstName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   <h4>Bowling: {bowlingStyle}</h4> 
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                   <h4>Batting: {battingStyle}</h4>
                </Typography>
                {/* <Typography variant="body2">
                    Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
                </Typography> */}
            </CardContent>
            <CardActions>
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/user/${id}`}>More Details</Link></Button>
            </CardActions>
        </Card>
    );
}

export default UserCardElement;