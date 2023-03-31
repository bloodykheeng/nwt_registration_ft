// import React, { useState } from "react";
// import MuiTable from "components/MuiTable";

// function ServicesList() {
//   const columns = [
//     { title: "First Name", field: "name" },
//     { title: "Last Name", field: "surname" },
//     { title: "Birth Year", field: "birthYear", type: "numeric" },
//     {
//       title: "Birth City",
//       field: "birthCity",
//       lookup: { 34: "kampala", 63: "masaka" }
//     }
//   ];

//   const data = [
//     {
//       id: 1,
//       name: "Buwembo",
//       surname: "David",
//       birthYear: 1987,
//       birthCity: 63
//     },
//     {
//       id: 2,
//       name: "Kalema",
//       surname: "Mark",
//       birthYear: 1987,
//       birthCity: 34
//     },
//     {
//       id: 3,
//       name: "Tsddy",
//       surname: "Teddy3",
//       birthYear: 1987,
//       birthCity: 63
//     },
//     {
//       id: 4,
//       name: "Irene",
//       surname: "Teddy3",
//       birthYear: 1987,
//       birthCity: 63
//     }
//   ];
//   const [tableData, setTableData] = useState(data);
//   const [tableColumns, setTableColumns] = useState(columns);
//   return (
//     <>
//       <MuiTable
//         tableColumns={tableColumns}
//         tableData={tableData}
//         setTableData={(data) => {
//           console.log("updated data : ", data);
//           setTableData(data);
//         }}
//       />
//     </>
//   );
// }

// export default ServicesList;

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
  getAllClientDetails,
  getClientDetailsById,
  addClientDetails,
  updateClientDetails,
  deleteClientDetails
} from "services/client-details/client-details";

import {
  getAllServiceStates,
  getServiceStatesById,
  addServiceStates,
  updateServiceStates,
  deleteServiceStates
} from "services/service-states/service-states";
import CustomDatePicker from "components/DatePicker/CustomDatePicker";

function ServicesList({ clientInfo, lookupData, clientLookupData }) {
  console.log("client list : ", clientInfo);
  console.log("lookupData : ", lookupData);
  console.log("clientLookupData : ", clientLookupData);

  console.log("{ ...lookupData }", { ...lookupData });

  const daysRemaining = (rowdata) => {
    var enddate = moment(rowdata.end_date);
    var startdate = moment(rowdata.start_date);
    startdate = moment();
    let yearsleft = enddate.diff(startdate, "years");
    let monthsleft = enddate.diff(startdate, "months");
    let weeksleft = enddate.diff(startdate, "weeks");
    let daysleft = enddate.diff(startdate, "days");
    let hoursleft = enddate.diff(startdate, "hours");
    let minutesleft = enddate.diff(startdate, "minutes");
    let secondsleft = enddate.diff(startdate, "seconds");

    // console.log(
    //   `Difference is ${enddate.diff(startdate, "days")} milliseconds`
    // );
    // console.log(`Difference is ${enddate.diff(startdate, "days")} day(s)`);
    // console.log(`Difference is ${enddate.diff(startdate, "weeks")} week(s)`);
    // console.log(`Difference is ${enddate.diff(startdate, "months")} month(s)`);
    // console.log("the days left are : ", daysleft);
    return (
      <small>
        {yearsleft > 0 && yearsleft + " yr, "}{" "}
        {monthsleft > 0 && monthsleft + " mths, "}
        {weeksleft > 0 && weeksleft + " wks, "}
        {daysleft > 0 && daysleft + " days, "}
        {hoursleft > 0 && hoursleft + " hrs, "}
        {minutesleft > 0 && minutesleft + " min, "}
        {secondsleft > 0 && secondsleft + " sec, "}
        {secondsleft < 1 && <strong style={{ color: "red" }}>expired</strong>}
      </small>
    );
  };

  const columns = [
    {
      title: "service_types_id",
      field: "service_types_id",
      lookup: { ...lookupData },
      editable: false
    },
    {
      title: "Time Remaining",
      field: "start_date",
      type: "text",
      cellStyle: {
        minWidth: 220,
        maxWidth: 220
      },
      render: (rowdata) => {
        return daysRemaining(rowdata);
      }
    },
    {
      title: "start_date",
      field: "start_date",
      type: "datetime",
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      }
    },
    {
      title: "end_date",
      field: "end_date",
      type: "datetime",
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      }
    },
    { title: "tax", field: "tax" },
    { title: "quantity ", field: "quantity" },
    { title: "price", field: "price" },
    { title: "currency", field: "currency" },
    {
      title: "description",
      field: "description",
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }
    },
    {
      title: "client_id",
      field: "client_id",
      lookup: { ...clientLookupData },
      editable: false
    },
    { title: "registrars_name", field: "registrars_name", editable: false },
    { title: "registrars_email", field: "registrars_email", editable: false },
    {
      title: "Created_At",
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
      editable: false
    },
    {
      title: "Updated_At",
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
      filterComponent: (props) => <CustomDatePicker {...props} />
    }
  ];
  const [tableData, setTableData] = useState();
  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  console.log("table data is : ", tableData);
  console.log("lookup data is : ", lookupData);
  //    { id: 2, service_name: "web hosting", registras_id: 1 }
  //fetching Service types data

  //fetching allServiceStates data
  const getAllServiceStatez = async () => {
    try {
      setIsLoading(true);
      let response = await getAllServiceStates();
      console.log("reponse for fetching service states : ", response);
      setTableData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //calling all function synchronusly to fetch data
  const fetchAllTableData = async () => {
    await getAllServiceStatez();
    return;
  };
  useEffect(() => {
    fetchAllTableData();
  }, []);

  const handleAddRow = async (data) => {
    try {
      setIsLoading(true);
      let response = await addServiceStates(data);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      getAllServiceStatez();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  const handleRowUpdate = async (data) => {
    try {
      setIsLoading(true);
      console.log("the handleRowUpdate data is : ", data);
      let response = await updateServiceStates(data.id, data);
      console.log("the handleRowUpdate reponse is : ", response);
      setIsLoading(false);
      getAllServiceStatez();
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
      let response = await deleteServiceStates(data.id);
      console.log("the handleRowDelete reponse is : ", response);
      setIsLoading(false);
      getAllServiceStatez();
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
              <h3 className="mb-0">Service Status</h3>
            </CardHeader>
            {errors && (
              <p style={{ color: "red" }}>
                There are semantic errors in your data
              </p>
            )}
            {isLoading && <h1>isLoading...</h1>}

            <MuiTable
              tableColumns={tableColumns}
              tableData={tableData}
              setTableData={setTableData}
              loading={isLoading}
              tableRowAdd={handleAddRow}
              tableRowUpdate={handleRowUpdate}
              tableRowDelete={handleRowDelete}
              tableTitle="List Of all Registered Services"
            />
          </Card>
        </div>
      </Row>
    </>
  );
}

export default ServicesList;
