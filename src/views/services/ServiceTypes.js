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
  getAllServiceTypes,
  getServiceTypesById,
  addServiceTypes,
  updateServiceTypes,
  deleteServiceTypes
} from "services/service-types/service-types";
import CustomDatePicker from "components/DatePicker/CustomDatePicker";
import CustomIsLoading from "components/loading/CustomIsLoading";

function ServiceTypes() {
  const columns = [
    {
      title: "Service Name",
      field: "service_name",
      cellStyle: {
        minWidth: 220
      }
    },
    {
      title: "Registrars Name",
      field: "registrars_name",
      editable: false,
      cellStyle: {
        minWidth: 220
      },
      hidden: true
    },
    {
      title: "Registrars Email",
      field: "registrars_email",
      editable: false,
      cellStyle: {
        minWidth: 220
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
      hidden: true,
      defaultSort: "desc"
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

  //fetching Service types data
  const getAllTheServiceTypes = async () => {
    try {
      setIsLoading(true);
      let response = await getAllServiceTypes();
      console.log("reponse for fetching service types : ", response);
      setTableData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //use effect to fetch all service types
  useEffect(() => {
    getAllTheServiceTypes();
  }, []);

  const handleAddRow = async (data) => {
    try {
      setIsLoading(true);
      let response = await addServiceTypes(data);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      getAllTheServiceTypes();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  const handleRowUpdate = async (data) => {
    try {
      setIsLoading(true);
      let response = await updateServiceTypes(data.id, data);
      console.log("the handleRowUpdate reponse is : ", response);
      setIsLoading(false);
      getAllTheServiceTypes();
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
      let response = await deleteServiceTypes(data.id);
      console.log("the handleRowDelete reponse is : ", response);
      setIsLoading(false);
      getAllTheServiceTypes();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error handleRowDelete is : ", err);
    }
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Service Types</h3>
            </CardHeader>
            {isLoading && <CustomIsLoading />}
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
              tableTitle="List Of all Service Types"
            />
          </Card>
        </div>
      </Row>
    </>
  );
}

export default ServiceTypes;
