import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ServicesList from "./ServicesList";
import ServiceTypes from "./ServiceTypes";
import Header from "components/Headers/Header";
import { getAllServiceTypes } from "services/service-types/service-types";
import {
  getAllClientDetails,
  getClientDetailsById,
  addClientDetails,
  updateClientDetails,
  deleteClientDetails
} from "services/client-details/client-details";
import Lottie from "lottie-react";
import Ocean from "../../assets/mylotties/56811-running-server.json";
import { height } from "@mui/system";

function ServicesPage() {
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [lookupData, setLookUpData] = useState();
  const [clientLookupData, setClientLookUpData] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllTheServiceTypes = async () => {
    try {
      setIsLoading(true);
      let response = await getAllServiceTypes();
      console.log("reponse for fetching service types : ", response);
      let status = {};
      await response.data.map((data) => {
        return (status[data.id] = data.service_name);
      });
      setLookUpData(status);
      //   setTableData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //fetching allClient data
  const getAllClients = async () => {
    try {
      setIsLoading(true);
      let response = await getAllClientDetails();
      console.log("reponse for fetching clients : ", response);
      // setTableData(response.data);
      let status = {};
      await response.data.map((data) => {
        return (status[data.id] = data.client_name);
      });
      setClientLookUpData(status);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  //calling all function synchronusly to fetch data
  const fetchAllTableData = async () => {
    await getAllTheServiceTypes();
    await getAllClients();
    return;
  };
  useEffect(() => {
    fetchAllTableData();
  }, []);
  return (
    <>
      <Header
        BackgroundObject={
          <Lottie
            animationData={Ocean}
            style={{
              objectFit: "cover",
              width: "100%",
              marginTop: "-300px"
            }}
            loop={true}
            autoplay={true}
          />
        }
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* mui Table */}
        <Row></Row>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Types" value="1" />
                <Tab label="Services" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ServiceTypes />
            </TabPanel>
            <TabPanel value="2">
              <ServicesList
                lookupData={lookupData}
                clientLookupData={clientLookupData}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}

export default ServicesPage;
