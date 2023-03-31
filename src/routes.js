/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ServicesPage from "views/services/ServicesPage";
import AdminPage from "views/Admin/AdminPage";
import ClientsPage from "views/Clients/ClientsPage";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InvoicesPage from "views/Invoices/InvoicesPage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon style={{ marginRight: "1rem", color: "maroon" }} />,
    component: Index,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "Services",
    icon: <BackupTableIcon style={{ marginRight: "1rem", color: "blue" }} />,
    component: ServicesPage,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Clients",
    icon: <PeopleAltIcon style={{ marginRight: "1rem", color: "tomato" }} />,
    component: ClientsPage,
    layout: "/admin"
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: <ReceiptIcon style={{ marginRight: "1rem", color: "green" }} />,
    component: InvoicesPage,
    layout: "/admin"
  },
  {
    path: "/Administrators",
    name: "Administrators",
    icon: (
      <AdminPanelSettingsIcon
        style={{ marginRight: "1rem", color: "orange" }}
      />
    ),
    component: AdminPage,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: <i className="ni ni-planet text-blue" />,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: <i className="ni ni-bullet-list-67 text-red" />,
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/index",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  {
    path: "/register",
    name: "Register",
    icon: <i className="ni ni-circle-08 text-pink" />,
    component: Register,
    layout: "/auth"
  }
];
export default routes;
