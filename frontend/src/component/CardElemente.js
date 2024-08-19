import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; 


const CardElement = ({ eventTitle, description, category, location, id }) => {
    const { palette } = useTheme();
    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>

            <CardContent >
              
                    <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {location}
                </Typography>
                <h1 className="font-poppins font-bold bg-gradient-to-r from-sky-600 to-red-300 bg-clip-text text-transparent text-2xl uppercase">{eventTitle}</h1>
                
                <h1 className="font-sans font-semibold mt-3" variant="body2">
                    {description.split(" ").slice(0, 20).join(" ") + "..."}
                </h1>
            </CardContent>
            <CardActions>
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/event/${id}`}>More Details</Link></Button>
            </CardActions>
        </Card>
    );
}

export default CardElement;