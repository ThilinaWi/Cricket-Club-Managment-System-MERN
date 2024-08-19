import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';
import { Box, Card, Container, ListItemIcon, MenuList, Pagination, Stack, Typography,MenuItem } from '@mui/material';
import UserCardElement from '../../component/UserCardElement';
import { allUserAction } from '../../redux/actions/userActions';
import LoadingBox from '../../component/lLoadingBox';
// import { MenuItem } from 'react-pro-sidebar';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import UserSelectComponent from '../../component/UserSelectComponent';

const AdminDashbord = () => {
  const { users, pages, loading, uniqueBowlingStyle, uniqueBattingStyle } = useSelector(state => state.allUsers);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { keyword, bowlingStyle, battingStyle} = useParams();

  // const [battingStyle, setBattingStyle] = React.useState('');

  useEffect(() => {
    dispatch(allUserAction(page, keyword, bowlingStyle, battingStyle));
  }, [page, keyword, bowlingStyle, battingStyle]);

  // const handleChangeStyle = (e) => {
  //   setBattingStyle(e.target.value);
  // };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Box sx={{ flex: 2, p: 2 }}>
            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
              <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                  Filter Bowling Style
                </Typography>        
               <MenuList>
                {
                  
                    uniqueBowlingStyle && uniqueBowlingStyle.map((bowlingStyle, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                          <SportsBaseballIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                          </ListItemIcon>
                          <Link style={{ color: palette.secondary.main }} to={`/search/bowlingStyle/${bowlingStyle}`}>{bowlingStyle}</Link>
                       </MenuItem>
                    ))
                }
                </MenuList>              
                </Box>
            </Card>

            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
              <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                  Filter Batting Style
                </Typography>
                {/* <UserSelectComponent handleChangeStyle={handleChangeStyle} battingStyle={battingStyle}/> */}

                <MenuList>
                   {
                      uniqueBattingStyle && uniqueBattingStyle.map((battingStyle, i) => (
                          <MenuItem key={i}>
                            <ListItemIcon>
                            <SportsCricketIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                            </ListItemIcon>
                            <Link style={{ color: palette.secondary.main }} to={`/search/battingStyle/${battingStyle}`}>{battingStyle}</Link>
                         </MenuItem>
                      ))
                  }

                 </MenuList>
              </Box>
            </Card>


          </Box>
          <Box sx={{ flex: 5, p: 2 }}>
            {
                loading ? 
                <LoadingBox/> :
                users && users.length === 0 ?

                <>
                    <Box sx= {{
                        minHeight: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}></Box>
                
                </> :
            
            
            
            users && users.map((user, i) => (
                <UserCardElement
                  key={i}
                  id={user._id}
                  firstName={user.firstName}
                  email={user.email}
                  bowlingStyle={user.bowlingStyle}
                  battingStyle={user.battingStyle}
                />
              ))} <Stack spacing={2} >
              <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
          </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminDashbord;
