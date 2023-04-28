import { Navigate, Link } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Members from "./pages/Members";
import NotFound from "./pages/Page404";
import Callender from "./pages/Callender";
import SportTypes from "./pages/SportTypes";
import Trainers from "./pages/Trainers";
import Payment from "./pages/Payement";
import Settings from "./pages/Settings";
import Profil from "./pages/Profil";
import RegiterReception from "./pages/RegisterReception";


// ----------------------------------------------------------------------

export default function Router(isAuth) {
  return [
    {
      path: "/dashboard",
      element: isAuth !== null ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "members", element: <Members /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "callender", element: <Callender /> },
        { path: "sportType", element: <SportTypes /> },
        { path: "trainers", element: <Trainers /> },
        { path: "payment", element: <Payment /> },
        { path: "profil", element: <Profil /> },
        { path: "settings", element: <Settings /> }      
      ],
    },
    {
      path: "/",
      element:
        isAuth === null ? <LogoOnlyLayout /> : <Navigate to="/dashboard/app" />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "calendar", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ];
}