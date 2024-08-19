import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../component/NavBar'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Box, Container,Stack,Card, Typography,useTheme, Pagination, TextField} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { pSessionLoadAction } from '../redux/actions/pSessionAction'
import CardElement from '../component/CardElement';
import { DatePicker } from '@mui/lab';
import LoadingBox from '../component/lLoadingBox';
import SelectComponent from '../component/SelectComponnent';
import { pSessionTypeLoadAction } from '../redux/actions/pSessionTypeAction';



const PsessionHome = () =>{

    const { loading, error, sessions, pages, count }= useSelector(state=>state.loadPSessions) //store name
    const dispatch = useDispatch();
    const { keyword,startDate,endDate } = useParams();

    const [page,setPage] = useState(1);
    const [cat,setCat] = React.useState('');

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');




    useEffect(()=>{
        dispatch(pSessionLoadAction(page,keyword,startDate,endDate,cat)); 
    },[page,keyword,startDate,endDate,cat])

    //psessionType

    useEffect(()=>{
        dispatch(pSessionTypeLoadAction()); 
    },[])


    //change Date formate
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()}`; // Change date format as needed
      };

      const handleChangeCategory = e => {
        setCat(e.target.value); // Update selected category in state
    };

    const handleStartDateChange = (value) => {
        setSelectedStartDate(new Date(value)); // Parse the value as a Date object
    };
    
    const handleEndDateChange = (value) => {
        setSelectedEndDate(new Date(value)); // Parse the value as a Date object
    };

      useEffect(() => {
    // Check if both start and end dates are selected before dispatching
    if (selectedStartDate && selectedEndDate) {
        const formattedStartDate = selectedStartDate.toISOString();
        const formattedEndDate = selectedEndDate.toISOString();
        dispatch(pSessionLoadAction(page, keyword, formattedStartDate, formattedEndDate, cat));
    }
}, [selectedStartDate, selectedEndDate, page, keyword, cat]);

    return (
        <>
        <Box sx={{bgcolor: "#fafafa",minHeight:"100vh"}}>

        
        <NavBar/>
        <Header/>

        <Container>
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Box sx={{flex:2,p:2}}>
                    <Card sx= {{midWidth:170,mb:3,mt:3,p:2}}>
                        <Box>
                        <Typography component="h4" sx={{ color:"#3187A2" }}>
                                Filter By Category
                            </Typography>
                        </Box>
                        <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat}/>

                    </Card>
                    <Card sx= {{midWidth:170,mb:3,mt:3,p:2}}>
                    <Box>
    <Typography component="h4" sx={{ color:"#3187A2" }}>
        Filter By Date
    </Typography>
    <TextField 
        id="start-date"
        label="Start Date"
        type="date"
        //value={selectedStartDate.date}
        onChange={(e) => handleStartDateChange(e.target.value)}
        InputLabelProps={{
            shrink: true,
        }}
        sx={{ marginBottom: 2 , marginTop: 2, width: '100%' }} // Add margin bottom to the first TextField
    />

    <TextField
        id="end-date"
        label="End Date"
        type="date"
        //value={selectedEndDate}
        onChange={(e) => handleEndDateChange(e.target.value)}
        InputLabelProps={{
            shrink: true,
        }}
        sx={{ marginBottom: 2,width: '100%' }} // Add margin bottom to the second TextField
    />

</Box>
                    

                    </Card>
                    


                </Box>

                <Box sx={{flex:5,p:2}}>
                {
                loading ? 
                <LoadingBox/> :
                sessions && sessions.length === 0 ?

                <>
                    <Box sx= {{
                        minHeight: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}></Box>
                
                </> :
                sessions &&
                sessions.map((session,i) => (
                    <CardElement
                    key={i}
                    SessionTitle={session.practiceSessionName}
                    id={session._id}
                    description={session.description}
                    Date={formatDate(session.date)}
                    location={session.location}
                        
                    />
    ))}<Stack spacing={2}>
        <Pagination page={page} count={page === 0 ? 1 : pages} onChange={(event,value) => setPage(value)} />
    </Stack>

                </Box>
            </Stack> 
        </Container>

        </Box>
        <Footer/>
        </>

    )
}

export default PsessionHome