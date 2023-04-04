import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import ProtectAdmin from "./protections/ProtectAdmin";

import useAuthContext from "context/AuthContext";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  console.log("location is  : ", location);
  let accessLocation = { location };
  console.log("accessLocation is  : ", accessLocation);

  const { user, getUser } = useAuthContext();
  React.useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={<prop.component />} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  // const getBrandText = (path) => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
  //       -1
  //     ) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  return (
    <>
      <Sidebar
        {...accessLocation}
        routes={routes}
        logo={{
          innerLink: "/admin/dashboard",
          imgSrc: require("../assets/img/brand/New Wave logo.jpg"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...accessLocation}
          // brandText={getBrandText(props.location.pathname)}
          brandText={location.pathname}
        />
        <Routes>
          {getRoutes(routes)}

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
