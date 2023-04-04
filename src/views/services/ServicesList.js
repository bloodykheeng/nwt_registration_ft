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
import CustomIsLoading from "components/loading/CustomIsLoading";
import { toast } from "react-toastify";
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
    var timeleft = moment(enddate).from(startdate);

    // console.log("timeleft date remaining : ", timeleft);

    // console.log(
    //   `Difference is ${enddate.diff(startdate, "days")} milliseconds`
    // );
    // console.log(`Difference is ${enddate.diff(startdate, "days")} day(s)`);
    // console.log(`Difference is ${enddate.diff(startdate, "weeks")} week(s)`);
    // console.log(`Difference is ${enddate.diff(startdate, "months")} month(s)`);
    // console.log("the days left are : ", daysleft);
    return (
      <small>
        {/* {yearsleft > 0 && yearsleft + " yr, "}{" "}
        {monthsleft > 0 && monthsleft + " mths, "}
        {weeksleft > 0 && weeksleft + " wks, "}
        {daysleft > 0 && daysleft + " days, "}
        {hoursleft > 0 && hoursleft + " hrs, "}
        {minutesleft > 0 && minutesleft + " min, "} */}
        {secondsleft > 0 && timeleft}
        {secondsleft < 1 && (
          <strong style={{ color: "red" }}>{timeleft}</strong>
        )}
      </small>
    );
  };

  const columns = [
    {
      title: "Client Name",
      field: "client_id",
      lookup: { ...clientLookupData },
      // editable: true,
      cellStyle: {
        minWidth: 220
      }
    },
    {
      title: "Service Types",
      field: "service_types_id",
      lookup: { ...lookupData },
      // editable: true,
      cellStyle: {
        minWidth: 220
      }
    },
    {
      title: "Expires",
      field: "start_date",
      type: "text",
      cellStyle: {
        minWidth: 220,
        maxWidth: 220
      },
      render: (rowdata) => {
        return daysRemaining(rowdata);
      },
      editable: false,
      filtering: false
    },
    {
      title: "Start Date",
      field: "start_date",
      type: "datetime",
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      }
      // filterComponent: (props) => <CustomDatePicker {...props} />
    },
    {
      title: "End Date",
      field: "end_date",
      type: "datetime",
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      }
      // filterComponent: (props) => <CustomDatePicker {...props} />
    },
    { title: "Tax", field: "tax" },
    {
      title: "quantity ",
      field: "quantity",
      cellStyle: {
        minWidth: 220
      }
    },
    {
      title: "price",
      field: "price",
      cellStyle: {
        minWidth: 220
      }
    },
    { title: "currency", field: "currency" },
    {
      title: "Description",
      field: "description",
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
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
      // filterComponent: (props) => <CustomDatePicker {...props} />,
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
      // filterComponent: (props) => <CustomDatePicker {...props} />,
      hidden: true
    }
  ];
  const [tableData, setTableData] = useState();
  const [tableColumns, setTableColumns] = useState();
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
    setTableColumns(columns);
  }, []);

  const handleAddRow = async (data) => {
    let serviceData = {
      service_type_id: data.service_types_id,
      start_date: moment(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
      tax: data.tax,
      quantity: data.quantity,
      price: data.price,
      currency: data.currency,
      description: data.description,
      client_id: data.client_id
    };
    //console.log("handle row add data is : ", data);
    console.log("service_state_data is : ", serviceData);
    try {
      setIsLoading(true);
      let response = await addServiceStates(serviceData);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      getAllServiceStatez();
      toast.success("service state created Succesfully");
    } catch (err) {
      setIsLoading(false);
      toast.error("error creating service state");
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  const handleRowUpdate = async (data) => {
    let serviceData = {
      service_type_id: data.service_types_id,
      start_date: moment(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
      tax: data.tax,
      quantity: data.quantity,
      price: data.price,
      currency: data.currency,
      description: data.description,
      client_id: data.client_id
    };
    try {
      setIsLoading(true);
      console.log("the handleRowUpdate data is : ", data);
      let response = await updateServiceStates(data.id, serviceData);
      console.log("the handleRowUpdate reponse is : ", response);
      setIsLoading(false);
      toast.success("service state updated Succesfully");
      getAllServiceStatez();
    } catch (err) {
      setIsLoading(false);
      toast.error("There was an error updating service state");
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
      toast.success("service state deleted Succesfully");
      getAllServiceStatez();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      toast.success("there was an error deleting service state");
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
            {isLoading && <CustomIsLoading />}

            <MuiTable
              tableColumns={columns}
              tableData={tableData}
              setTableData={setTableData}
              loading={isLoading}
              tableRowAdd={handleAddRow}
              tableRowUpdate={handleRowUpdate}
              tableRowDelete={handleRowDelete}
              tableTitle="List Of All Running Services"
            />
          </Card>
        </div>
      </Row>
    </>
  );
}

export default ServicesList;
