import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Test from './pages/test';
import Login from './pages/Login';

import CoachListuser from './pages/CoachListUser'
import UserDashbord from './pages/userDashbord';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theam'; 
import { ToastContainer } from 'react-toastify';
import { ProSidebarProvider } from 'react-pro-sidebar'; // Correct import statement
import 'react-toastify/dist/ReactToastify.css';
import UserRoute from './component/userRoute';
import AdminRoute from './component/adminRoute';
import Layout from './pages/global/Layout';
import PsessionAdminDashbord from './pages/Admin/pSessionDash'
import SinglepSession from './pages/singlePsession';
import CreatepSession from './pages/Admin/CreatePsession';
import UpdatepSession from './pages/Admin/updatePsession';
import Register from './pages/Register';
import DashUsers from './pages/Admin/DashUsers';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import UserUpdateDashboard from './pages/user/UserUpdateDashboard';
import adminDashbord from './pages/Admin/adminDashbord';


import ShowSingleUser from './pages/user/ShowSingleUser';


import PlayerPerformanceAdmin from './pages/Admin/PlayerPerformanceAdmin';
import AddBattingForm from './pages/Admin/createPlayerP';
import EditBattingForm from './pages/Admin/EditPlayerP';
import PlayerPerformancepage from './pages/PlayerPerformance';
import PsessionHome from './pages/PsessionHome';
import Homee from './pages/Home';
import UserEventsHistory from './pages/user/UserEventsHistory';
import Event from './pages/Event';
import SingleEvent from './pages/SingleEvent';
import DashEvents from './pages/Admin/DashEvents';
import DashCategory from './pages/Admin/DashCategory';
import DashCreateEvent from './pages/Admin/DashCreateEvent';
import DashCreateCategory from './pages/Admin/DashCreateCategory';
import DashEditEvent from './pages/Admin/DashEditEvent';


import AddItem from './pages/Admin/AddItem';
import ItemDetails from './pages/Admin/ItemDetails';
import DashBoard from './pages/user/DashBoard';
import BatDetails from './pages/user/BatDetails';
import BallDetails from './pages/user/BallDetails';
import GlovesDetails from './pages/user/GlovesDetails';
import HelmetsDetails from './pages/user/HelmetsDetails';
import PadsDetails from './pages/user/PadsDetails';
import ShoesDetails from './pages/user/ShoesDetails';
import GetItem from './pages/user/GetItem';


//dulaksha
import PlayerSalaryForm from "./pages/user/SalaryForm";
import PlayerDetails from "./pages/Admin/PlayerDetails";
import PlayerValidate from "./pages/user/Validate";
import AdminLogin from "./pages/Admin/AdminLogin";
import AddSalary from "./pages/Admin/AddSalary";
import CoachSalaryForm from "./pages/coach/CoachSalaryForm";
import CoachValidates from "./pages/coach/CoachValidates";
import CoachDetails from "./pages/Admin/CoachDetails";
import AddCoachSalary from "./pages/Admin/AddCoachSalary";
import AdminDash from "./pages/Admin/AdminDash";

//Thilina
import MyPerformance from"./pages/user/MyPerformance"



import AddEvent from "./pages/Admin/AddEvent";
import UpdateEvent from "./pages/Admin/UpdateEvent";
import Event1 from "./pages/Admin/Event";
import EventPage from "./pages/user/EventPage";

import DashCoaches from './pages/Admin/DashCoaches';
import DeleteCoach from './pages/Admin/DeleteCoach';
import AddCoach from './pages/Admin/AddCoach';
import DashUpdateCoach from './pages/Admin/DashUpdateCoach';
import CoachnHome from './pages/user/CoachHome';
import CoachShow from './pages/user/CoachShow';
import CoachHome from './pages/user/CoachHome';

// HOC
const MyperformanceHOC = Layout(MyPerformance);
const UserDashbordHOC = Layout(UserDashbord);
const AdminDashbordHOC = Layout(adminDashbord);
const PsessionAdminDashbordHOC = Layout(PsessionAdminDashbord);
const CreatepSessionHOC = Layout(CreatepSession);
const UpdatepSessionHOC = Layout(UpdatepSession);
const SinglepSessionHOC = SinglepSession;
const DashUsersHOC = Layout(DashUsers);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const UserUpdateDashboardHOC = Layout(UserUpdateDashboard);


const AddCoachHOC = Layout(AddCoach);
const DeleteCoachHOC = Layout(DeleteCoach);
const AllCoachHOC = Layout(DashCoaches)
const CoachEditHOC = Layout(DashUpdateCoach)

const ShowSingleUserHOC = Layout(ShowSingleUser);

const PlayerPerformance = Layout(PlayerPerformanceAdmin);
const AddBattingFormHOC = Layout(AddBattingForm);
const EditBattingFormHOC = Layout(EditBattingForm);
const PlayerPerformancePageHOC = Layout(PlayerPerformancepage);

const UserEventsHistoryHOC = Layout(UserEventsHistory);
const DashEventsHOC = Layout(DashEvents);
const DashCategoryHOC = Layout(DashCategory)
const DashCreateEventHOC = Layout(DashCreateEvent)
const DashCreateCategoryHOC = Layout(DashCreateCategory)
const DashAdminEditEventHOC = Layout(DashEditEvent);
const COACHUSERHOC = Layout(CoachHome)



const AddItemHOC = Layout(AddItem);
const ItemDetailsHOC = Layout(ItemDetails);
const DashBoardHOC = Layout(DashBoard);
const BatDetailsHOC = Layout(BatDetails);
const BallDetailsHOC = Layout(BallDetails);
const GlovesDetailsHOC = Layout(GlovesDetails);
const HelmetsDetailsHOC = Layout(HelmetsDetails);
const PadsDetailsHOC = Layout(PadsDetails);
const ShoesDetailsHOC = Layout(ShoesDetails);
const GetItemHOC = Layout(GetItem);

//financial
const PlayerSalaryFormHOC = Layout(PlayerSalaryForm);
const PlayerDetailsHOC = Layout(PlayerDetails);
const PlayerValidateHOC = Layout(PlayerValidate);
const AdminLoginHOC = Layout(AdminLogin);
const AddSalaryHOC = Layout(AddSalary);
const CoachSalaryFormHOC = Layout(CoachSalaryForm);
const CoachValidatesHOC = Layout(CoachValidates);
const CoachDetailsHOC = Layout(CoachDetails);
const AddCoachSalaryHOC = Layout(AddCoachSalary);
const AdminDashHOC = Layout(AdminDash);

const userCoachHOC = Layout(CoachShow)







const AddEventHOC = Layout(AddEvent);
const UpdateEventHOC = Layout(UpdateEvent);
const Event1HOC = Layout(Event1);
const EventPageHOC = Layout(EventPage);

function App() {
  return (
    <>
      <ToastContainer/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider> {/* Use ProSidebarProvider */}
          <BrowserRouter>
            <Routes>

              <Route path='/psession' element={<PsessionHome />} />
              <Route path='/psession/search/:keyword' element={<PsessionHome />} />
              <Route path='/admin/dashboard/search/:keyword' element={<AdminRoute><AdminDashbordHOC/></AdminRoute>} />
              <Route path='/user/:id' element={<AdminRoute><ShowSingleUserHOC/></AdminRoute>} />
              {/* <Route path='/test' element={<Test />} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/search/bowlingStyle/:bowlingStyle' element={<AdminRoute><AdminDashbordHOC/></AdminRoute>} />
              <Route path='/search/battingStyle/:battingStyle' element={<AdminRoute><AdminDashbordHOC/></AdminRoute>} />
              <Route path='/psession/:id' element={<UserRoute><SinglepSessionHOC/></UserRoute>} />
              <Route path='/test' element={<Test />} />
              <Route path='/coachlist' element={<CoachListuser />} />
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashbordHOC/></AdminRoute>} />
              <Route path='/user/dashboard' element={<UserRoute><UserDashbordHOC/></UserRoute>} />
              <Route path='/user/info' element={<UserRoute><UserInfoDashboardHOC/></UserRoute>} />
              <Route path='/admin/psessions' element={<UserRoute><PsessionAdminDashbordHOC/></UserRoute>} />
              <Route path='/admin/users' element={<UserRoute><DashUsersHOC/></UserRoute>} />
              <Route path='/user/update/:id' element={<UserRoute><UserUpdateDashboardHOC/></UserRoute>} />
              <Route path='/admin/createpsessions' element={<UserRoute><CreatepSessionHOC/></UserRoute>} />
              <Route path='/admin/updatepsessions/:id' element={<UserRoute><UpdatepSessionHOC/></UserRoute>} />

              <Route path="/coach/add" element={<UserRoute><AddCoachHOC/></UserRoute>} />
              <Route path="coach/" element={<UserRoute><AllCoachHOC/></UserRoute>} />
              <Route path ="/coach/update/:id" element={<UserRoute><CoachEditHOC/></UserRoute>} />
              <Route path ="/coach/delete/:id" element={<UserRoute><DeleteCoachHOC/></UserRoute>} />
              <Route path='/user/coach' element={<UserRoute><userCoachHOC /></UserRoute>} />
              <Route path='/user/show/coaches' element={<UserRoute><COACHUSERHOC/></UserRoute>}/>



              
              <Route path='/admin/PPerformance' element={<UserRoute><PlayerPerformance/></UserRoute>} />
              <Route path='/user/create' element={<UserRoute><AddBattingFormHOC /></UserRoute>} />
              <Route path='/user/edit' element={<UserRoute><EditBattingFormHOC /></UserRoute>} />
              <Route path='/Performance' element={<PlayerPerformancepage />} />



              <Route path='/admin/additem' element={<AdminRoute><AddItemHOC/></AdminRoute>} />
              <Route path='/admin/itemdash' element={<AdminRoute><ItemDetailsHOC/></AdminRoute>} />
              <Route path='/dashboard' element={<UserRoute><DashBoardHOC/></UserRoute>} />
              <Route path='/batdetails' element={<UserRoute><BatDetailsHOC/></UserRoute>} />
              <Route path='/balldetails' element={<UserRoute><BallDetailsHOC/></UserRoute>} />
              <Route path='/glovesdetails' element={<UserRoute><GlovesDetailsHOC/></UserRoute>} />
              <Route path='/helmetsdetails' element={<UserRoute><HelmetsDetailsHOC/></UserRoute>} />
              <Route path='/padsdetails' element={<UserRoute><PadsDetailsHOC/></UserRoute>} />
              <Route path='/shoesdetails' element={<UserRoute><ShoesDetailsHOC/></UserRoute>} />
              
              



              <Route path='/searchJ/:keyword' element={<PlayerPerformancepage />} />
                
              <Route path='*' element={<NotFound />} />

              <Route path='/' element={<Homee />} />
                            <Route path='/search/location/:location' element={<Event />} />
                            <Route path='/event/search/:keyword' element={<Event />} />
                            <Route path='/event' element={<Event />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/event/:id' element={<SingleEvent />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><adminDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/events' element={<AdminRoute><DashEventsHOC /></AdminRoute>} />
                            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                            <Route path='/admin/event/create' element={<AdminRoute><DashCreateEventHOC /></AdminRoute>} />
                            <Route path='/admin/edit/event/:id' element={<AdminRoute><DashAdminEditEventHOC /></AdminRoute>} />
                            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                            <Route path='/user/dashboard' element={<UserRoute>< userDashboardHOC /></UserRoute>} />
                            <Route path='/user/events' element={<UserRoute>< UserEventsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />

                            <Route path='/user/myperformance' element={<UserRoute>< MyperformanceHOC /></UserRoute>} />

           {/*User financial*/}                 
          <Route path="/userSalary" element={<PlayerSalaryFormHOC />} />
          <Route path="/coachSalary" element={<CoachSalaryFormHOC />} />
          <Route path="/employeevalidates" element={<PlayerValidateHOC />} />
          <Route path="/coachvalidates" element={<CoachValidatesHOC />} />
          {/*Admin financial*/}
          <Route path="/employeedetails" element={<AdminRoute><PlayerDetailsHOC /></AdminRoute>} />
          <Route path="/adminlogin" element={<AdminLoginHOC />} />
          <Route path="/adminDash" element={<AdminRoute><AdminDashHOC /></AdminRoute>} />
          <Route path="/addsalary/:id" element={<AdminRoute><AddSalaryHOC /></AdminRoute>} />
          <Route path="/coachdetails" element={<AdminRoute><CoachDetailsHOC /></AdminRoute>} />
          <Route path="/addcoachsalary/:id" element={<AddCoachSalaryHOC />} />
          {/*Admin Side*/}
          <Route path="/AddEvent" element={<AddEventHOC />} />
          <Route path="/updateevent/:id" element={<UpdateEventHOC />} />
          <Route path="/eventdash" element={<AdminRoute><Event1HOC /></AdminRoute>} />
          {/*User Side*/}
          <Route path="/eventpage" element={<EventPageHOC />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
