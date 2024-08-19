import React, { useEffect } from 'react'
import { Sidebar, Menu, MenuItem, menuClasses, useProSidebar } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, useTheme } from '@mui/material';
import Person3Icon from '@mui/icons-material/Person3';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
const SidebarAdm = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const { palette } = useTheme();
    const { collapsed } = useProSidebar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfileAction());
    }, []);


    //log out 
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }


    return (
        <>
            <Sidebar backgroundColor="#003366" style={{ borderRightStyle: "none" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                    <Box>
                        <Box sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>

                        <a
                                class="mb-4 me-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                                href="/">
                                <img src="https://i.pinimg.com/originals/e2/63/e8/e263e8f739d6975cb42e30054b793a2d.png" className="w-24 h-24" />
                        </a>

                        </Box>

                        <Menu className="font-poppins"

                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#fafafa",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "rgba(23,105,170, 1)",
                                        color: "#fafafa",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        // color: "blue",
                                        color: palette.secondary.main,
                                        //color: "red",
                                    }
                                },
                            }}

                        >
                            {
                                userInfo && userInfo.role === 1 ?
                                    <>
                                        <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem component={<Link to="/admin/users" />} icon={<GroupAddIcon />}> Players </MenuItem>
                                        <MenuItem component={<Link to="/admin/psessions" />} icon={<SportsCricketIcon />}> Practice Sessions </MenuItem>
                                        <MenuItem component={<Link to="/user/info" />} icon={<Person3Icon />}> Account </MenuItem>
                                        <MenuItem component={<Link to="/admin/PPerformance" />} icon={<Person3Icon />}>Player Performance </MenuItem>
                                        <MenuItem component={<Link to="/Coach/" />} icon={<GroupAddIcon />}> Coaches List </MenuItem>
                                        <MenuItem component={<Link to="/admin/events" />} icon={<EmojiEventsIcon />}> Events </MenuItem>
                                        <MenuItem component={<Link to="/admin/category" />} icon={<EventIcon />}> Category </MenuItem>


                                        {/* <MenuItem component={<Link to="/admin/additem" />} icon={<EventIcon />}> Add Item </MenuItem> */}
                                        <MenuItem component={<Link to="/admin/itemdash" />} icon={<SportsTennisIcon />}> Equipments </MenuItem>

                                        <MenuItem component={<Link to="/adminDash" />} icon={<AccountBalanceIcon/>}> Financial Details </MenuItem>
                                        <MenuItem component={<Link to="/AddEvent" />} icon={<AccountBalanceIcon />}> match coordination </MenuItem>
                                        <MenuItem component={<Link to="/eventdash" />} icon={<AccountBalanceIcon />}>All Match </MenuItem>

                                    </> :
                                    <>
                                        <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem component={<Link to="/user/info" />} icon={<Person3Icon />}> Personal Info </MenuItem>
                                        <MenuItem component={<Link to="/user/myperformance" />} icon={<DashboardIcon />}> My performance </MenuItem> 
                                        <MenuItem component={<Link to="/dashboard" />} icon={<Person3Icon />}> Item info </MenuItem>           
                                        <MenuItem component={<Link to="/userSalary" />} icon={<AccountBalanceIcon />}> Financial Details </MenuItem>

                                        <MenuItem component={<Link to="/eventpage" />} icon={<AccountBalanceIcon />}> match coordination </MenuItem>
                                        

                                        <MenuItem component={<Link to="/user/show/coaches" />} icon={<AccountBalanceIcon />}> coaches</MenuItem>

                                    </>
                            }
                            

                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#fafafa",
                                    },

                                    '&:hover': {
                                        backgroundColor: "rgba(23,105,170, 1)",
                                        color: "#fafafa",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        // color: "blue",
                                        color: palette.secondary.main,
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={logOut} icon={<LoginIcon />}>   Log out </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
}

export default SidebarAdm