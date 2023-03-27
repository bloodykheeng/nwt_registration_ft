import React, { useState } from "react";
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

function ServicesPage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
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
                <Tab label="Services" value="1" />
                <Tab label="Types" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ServicesList />
            </TabPanel>
            <TabPanel value="2">
              <ServiceTypes />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}

export default ServicesPage;
