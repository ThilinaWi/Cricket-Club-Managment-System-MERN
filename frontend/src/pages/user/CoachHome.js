import React, { useEffect, useState } from 'react'
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CardElement from '../../component/CardElementC'
import { allCoachAction } from '../../redux/actions/coachActions'
import LoadingBox from '../../component/LoadingBox'

const CoachHome = () => {
    const { coaches ,loading} = useSelector(state => state.allCoach)
    const dispatch = useDispatch();
    const { palette } = useTheme();

    useEffect(() => {
        dispatch(allCoachAction())
    },[])
  return (
    <>
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
<Container>
    <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
    >
        <Box sx={{ flex: 2, p: 2 }}>
            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
               
            </Card>

            {/* events by location */}
            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                <Box sx={{ pb: 2 }}>
                    {/* <h4>Filter by category</h4> */}
                </Box>
            </Card>
        </Box>
        <Box sx={{ flex: 5, p: 2 }}>
            {
                loading ?
                    <LoadingBox /> :
                    coaches && coaches.length === 0 ?
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


                        coaches && coaches.map((coach, i) => (
                            <CardElement
                                key={i}
                                id={coach._id}
                                name={coach.name}
                                age={coach.age}
                            />
                        ))
            }
        </Box>
    </Stack>
</Container>
</Box>
</>
  )
}

export default CoachHome