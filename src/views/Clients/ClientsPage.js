import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import MuiTable from "components/MuiTable";
import Header from "components/Headers/Header";
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
import {
  getAllAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin
} from "../../services/admin/admins-service";

import {
  getAllClientDetails,
  getClientDetailsById,
  addClientDetails,
  updateClientDetails,
  deleteClientDetails
} from "services/client-details/client-details";

import PasswordIcon from "@mui/icons-material/Password";
import CustomDatePicker from "components/DatePicker/CustomDatePicker";
import CustomModal from "components/CustomModal/CustomModal";
import ClientsServicesForm from "./ClientsServicesForm";
import ClientServiceList from "./ClientServiceList";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getAllServiceTypes } from "services/service-types/service-types";
import Lottie from "lottie-react";
import ClientsLottie from "../../assets/mylotties/56811-running-server.json";

import ClientInvoiceList from "./ClientInvoiceList";

function ClientsPage() {
  const columns = [
    {
      title: "Client Name",
      field: "client_name",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Client Address",
      field: "client_address",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Client Po Box",
      field: "client_pobox",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Client Phonenumber",
      field: "client_phonenumber",
      cellStyle: {
        minWidth: 210
      },
      hidden: true
    },
    {
      title: "Client Email",
      field: "client_email",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Registrars Name",
      field: "registrars_name",
      editable: false,
      cellStyle: {
        minWidth: 210
      },
      hidden: true
    },
    {
      title: "Registrars Email",
      field: "registrars_email",
      editable: false,
      cellStyle: {
        minWidth: 210
      },
      hidden: true
    },
    {
      title: "Created At",
      field: "created_at",
      type: "datetime",
      // render: (rowData) => {
      //   return moment(rowData.created_at).format("lll");
      // },
      // type: "date",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props) => <CustomDatePicker {...props} />,
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      },
      editable: false,
      hidden: true
    },
    {
      title: "Updated At",
      field: "updated_at",
      // render: (rowData) => {
      //   return moment(rowData.updated_at).format("lll");
      // },
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      },
      editable: false,
      type: "datetime",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props) => <CustomDatePicker {...props} />,
      hidden: true
    }
  ];
  const [tableData, setTableData] = useState();
  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [clientInfo, setClientInfo] = useState();
  const [lookupData, setLookUpData] = useState();
  const [clientLookupData, setClientLookUpData] = useState();

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

  console.log("clientInfo parent", clientInfo);
  //fetching allClient data
  const getAllClients = async () => {
    try {
      setIsLoading(true);
      let response = await getAllClientDetails();
      console.log("reponse for fetching clients : ", response);
      setTableData(response.data);
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

  const handleAddRow = async (data) => {
    try {
      setIsLoading(true);
      let response = await addClientDetails(data);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      getAllClients();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  const handleRowUpdate = async (data) => {
    try {
      setIsLoading(true);
      let response = await updateClientDetails(data.id, data);
      console.log("the handleRowUpdate reponse is : ", response);
      setIsLoading(false);
      getAllClients();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error handleRowUpdate is : ", err);
    }
  };

  // tableRowDelete
  const handleRowDelete = async (data) => {
    try {
      setIsLoading(true);
      let response = await deleteClientDetails(data.id);
      console.log("the handleRowDelete reponse is : ", response);
      setIsLoading(false);
      getAllClients();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error handleRowDelete is : ", err);
    }
  };

  const [openCustomModal, setOpenCustomModal] = useState();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header
        BackgroundObject={
          <Lottie
            animationData={ClientsLottie}
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
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Clients</h3>
              </CardHeader>
              {errors && (
                <p style={{ color: "red" }}>
                  There are semantic errors in your data
                </p>
              )}
              <MuiTable
                tableColumns={tableColumns}
                tableData={tableData}
                setTableData={setTableData}
                loading={isLoading}
                tableRowAdd={handleAddRow}
                tableRowUpdate={handleRowUpdate}
                tableRowDelete={handleRowDelete}
                showAddMoreServices={true}
                handleAddMoreServices={(e, data) => {
                  console.log("the data when adding more services", e);
                  setClientInfo(data);
                  setOpenCustomModal(true);
                }}
                tableTitle="List Of all Clients"
              />
              <CustomModal
                open={openCustomModal}
                handleClose={() => setOpenCustomModal(false)}
              >
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Form" value="1" />
                      <Tab label="Services" value="2" />
                      <Tab label="Invoices" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <ClientsServicesForm clientInfo={clientInfo} />
                  </TabPanel>
                  <TabPanel value="2">
                    <ClientServiceList
                      clientInfo={clientInfo}
                      lookupData={lookupData}
                      clientLookupData={clientLookupData}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <ClientInvoiceList clientInfo={clientInfo} />
                  </TabPanel>
                </TabContext>
              </CustomModal>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ClientsPage;
