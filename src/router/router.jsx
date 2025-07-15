import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import RegisterPage from "../pages/authentication/Register";
import Membership from "../pages/Home/Home/Membership";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import MyPost from "../pages/Dashboard/MyPost";
import PostDetails from "../pages/Home/Home/PostDetails";
import AdminRoute from "../routes/AdminRoute";
import AdminProfile from "../pages/Admin/AdminProfile";
import ManageUsers from "../pages/Admin/ManageUsers";
import ReportedContent from "../pages/Admin/ReportedContent";
import MakeAnnouncement from "../pages/Home/Home/MakeAnnouncement";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'membership',
            Component: Membership
        },
        {
          path: 'post/:id',
          element: <PostDetails></PostDetails>
        }
    ]
  },


  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'register',
            Component: RegisterPage
        }
        
    ]
  },


  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'addPost',
        element: <AddPost></AddPost>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      },

       // ✅ Admin-only routes
    {
      path: 'adminProfile',
      element: <AdminRoute><AdminProfile /></AdminRoute>
    },
    {
      path: 'manageUsers',
      element: <AdminRoute><ManageUsers /></AdminRoute>
    },
    {
      path: 'reported',
      element: <AdminRoute><ReportedContent /></AdminRoute>
    },
    {
      path: 'announcement',
      element: <AdminRoute><MakeAnnouncement /></AdminRoute>
    },
   
    ]
  }

]);