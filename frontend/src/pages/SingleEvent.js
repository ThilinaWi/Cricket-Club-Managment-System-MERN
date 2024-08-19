import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import Navbar from '../component/NavBar';
import { eventLoadSingleAction } from '../redux/actions/eventAction';
import Button from '@mui/material/Button';
import { userApplyEventAction } from '../redux/actions/userActions';
import { useTheme } from '@emotion/react';

const SingleEvent = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { singleEvent, loading } = useSelector(state => state.singleEvent);
    const { id } = useParams();
    useEffect(() => {
        dispatch(eventLoadSingleAction(id));
    }, [id]);

    const applyForAEvent = () => {
        dispatch(userApplyEventAction({
            title: singleEvent && singleEvent.title,
            description: singleEvent && singleEvent.description,
            location: singleEvent && singleEvent.location
        }));
    };

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa" }}>
                <Navbar />
                <Box sx={{ height: 'calc(100vh - 140px)' }}>
                    <Container sx={{ pt: '30px' }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>
                                {loading ? (
                                    <LoadingBox />
                                ) : (
                                    <>
                                        <Card sx={{ bgcolor: palette.primary.white }}>
                                            <CardContent>
                                                <Typography variant="h3" component="h3">
                                                    {singleEvent && singleEvent.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    <h1 style={{ fontWeight: 'bold' }}>Location:</h1>
                                                    {singleEvent && singleEvent.location}
                                                </Typography>
                                                <Typography variant="body2" sx={{ pt: 2 }}>
                                                    <h1 style={{ fontWeight: 'bold' }}>Event details:</h1>
                                                    {singleEvent && singleEvent.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>


                                    </>
                                )}
                            </Box>
                            {/* <Box sx={{ flex: 1, p: 2 }}>
                                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                                    <Button onClick={applyForAEvent} sx={{ fontSize: "13px" }} variant='contained'>I will join for this Event</Button>
                                </Card>
                            </Box> */}
                        </Stack>
                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default SingleEvent;
