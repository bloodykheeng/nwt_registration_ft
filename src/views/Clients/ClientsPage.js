import React, { useState, useEffect } from "react";
import moment from "moment";
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

function ClientsPage() {
  const columns = [
    { title: "client_name", field: "client_name" },
    { title: "client_address", field: "client_address" },
    { title: "client_pobox", field: "client_pobox" },
    { title: "client_phonenumber", field: "client_phonenumber" },
    { title: "client_email", field: "client_email" },
    { title: "registrars_name", field: "registrars_name", editable: false },
    { title: "registrars_email", field: "registrars_email", editable: false },
    {
      title: "Created At",
      field: "created_at",
      render: (rowData) => {
        return moment(rowData.created_at).format("lll");
      },
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      },
      editable: false
    },
    {
      title: "Updated At",
      field: "updated_at",
      render: (rowData) => {
        return moment(rowData.updated_at).format("lll");
      },
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      },
      editable: false
    }
  ];
  const [tableData, setTableData] = useState();
  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  //fetching admin data
  // const getAllAdmins = async () => {
  //   try {
  //     setIsLoading(true);
  //     let response = await getAllAdmin();
  //     console.log("reponse for fetching admins : ", response);
  //     setTableData(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  //fetching allClient data
  const getAllClients = async () => {
    try {
      setIsLoading(true);
      let response = await getAllClientDetails();
      console.log("reponse for fetching clients : ", response);
      setTableData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllClients();
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

  return (
    <>
      <Header />
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
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ClientsPage;
