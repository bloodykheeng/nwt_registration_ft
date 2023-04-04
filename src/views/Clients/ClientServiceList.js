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
import ReceiptIcon from "@mui/icons-material/Receipt";

import {
  getAllServiceStates,
  getServiceStatesById,
  addServiceStates,
  updateServiceStates,
  deleteServiceStates
} from "services/service-states/service-states";
import CustomDatePicker from "components/DatePicker/CustomDatePicker";
import { addInvoices, getAllInvoices } from "services/invoices/invoices";
import { getAllInvoiceAddress } from "services/invoice-address/invoice-address";

import CustomIsLoading from "components/loading/CustomIsLoading";
import { ToastContainer, toast } from "react-toastify";

function ClientServiceList({ clientInfo, lookupData, clientLookupData }) {
  console.log("client list : ", clientInfo);

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

    console.log("timeleft date remaining : ", timeleft);

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
      editable: false,
      cellStyle: {
        minWidth: 220
      },
      editable: false
    },
    {
      title: "Service Types Id",
      field: "service_types_id",
      lookup: { ...lookupData },
      editable: false,
      cellStyle: {
        minWidth: 210
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
      }
    },
    {
      title: "Start Date",
      field: "start_date",
      type: "datetime",
      cellStyle: {
        minWidth: 220,
        maxWidth: 220
      }
    },
    {
      title: "End Date",
      field: "end_date",
      type: "datetime",
      cellStyle: {
        minWidth: 220,
        maxWidth: 220
      }
    },
    {
      title: "Tax",
      field: "tax",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "quantity ",
      field: "quantity",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "price",
      field: "price",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "currency",
      field: "currency",
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Description",
      field: "description",
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }
    },
    { title: "Registrars Name", field: "registrars_name", editable: false },
    { title: "Registrars Email", field: "registrars_email", editable: false },
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
      filterComponent: (props) => <CustomDatePicker {...props} />
    }
  ];
  const [tableData, setTableData] = useState();
  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [invoiceAddressData, setInvoiceAddressData] = useState();

  console.log("table data is : ", tableData);
  console.log("lookup data is : ", lookupData);
  //    { id: 2, service_name: "web hosting", registras_id: 1 }
  //fetching Service types data

  //fetching allServiceStates data
  const getAllServiceStatezById = async () => {
    try {
      setIsLoading(true);
      let response = await getServiceStatesById(clientInfo.id);
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
    await getAllTheInvoiceAddress();
    await getAllServiceStatezById();

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
      getAllServiceStatezById();
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
      getAllServiceStatezById();
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
      getAllServiceStatezById();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error handleRowDelete is : ", err);
    }
  };

  //   get all invoice address
  const getAllTheInvoiceAddress = async () => {
    try {
      setIsLoading(true);
      let response = await getAllInvoiceAddress();
      console.log("reponse for fetching getAllInvoiceAddress: ", response);
      setInvoiceAddressData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  //   let current_date = moment().format("YYYY/MM/DD");
  let current_date = moment().format("YYYY-MM-DD");
  console.log("current_date is : ", current_date);

  let newDate = Number(current_date.slice(0, 10).split("-").join(""));
  console.log("newDate is : ", newDate);

  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function getInvoiceId() {
    let randomnumber = generateRandomInteger(10000);
    // console.log("randomnumber is : ", randomnumber);
    // console.log(
    //   "newDate.toString() + value4.toString() is : ",
    //   newDate.toString() + randomnumber.toString()
    // );

    let invoiceid = newDate.toString() + randomnumber.toString();
    return invoiceid;
  }

  //handle sending invoice
  const handleSendingInvoice = async (data) => {
    // var enddate = moment(data.end_date);
    // var startdate = moment(data.start_date);
    var enddate = moment("2023-03-31 01:51:00");
    var startdate = moment("2023-03-29 01:51:00");
    let currentdate = moment();

    let secondsleft = enddate.diff(currentdate, "seconds");
    // console.log("seconds left are : ", secondsleft);
    if (secondsleft > 1) {
      let invoiceData = {
        invoice_id: getInvoiceId(),
        invoice_tin: 1000292703,
        invoice_address_id: invoiceAddressData[0]?.id,
        service_state_id: data.id
      };
      // console.log("invoiceData is : ", invoiceData);
      try {
        setIsLoading(true);

        let response = await addInvoices(invoiceData);
        console.log("the reponse sending invoice: ", response);
        setIsLoading(false);
        toast.success("invoice created succesfully");
        // alert("invoice created succesfully");
      } catch (err) {
        setIsLoading(false);
        toast.error("there was an error creating invoce");
        setErrors(err.response.data);
        console.log("error is : ", err);
      }
    } else {
      toast.warning("service already expired");
    }
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow" style={{ padding: "1rem" }}>
            <CardHeader className="border-0">
              <h3 className="mb-0">{`List Of all Services attached to ${clientInfo.client_name}`}</h3>
            </CardHeader>
            {errors && (
              <p style={{ color: "red" }}>
                There are semantic errors in your data
              </p>
            )}
            {isLoading && <CustomIsLoading />}
            {!isLoading && (
              <MuiTable
                tableColumns={tableColumns}
                tableData={tableData}
                setTableData={setTableData}
                loading={isLoading}
                tableRowAdd={handleAddRow}
                tableRowUpdate={handleRowUpdate}
                tableRowDelete={handleRowDelete}
                tableTitle="service status"
                showAddMoreServices={true}
                addindmoreservicesIcon=<ReceiptIcon
                  style={{ color: "green" }}
                />
                addindmoreservicesTitle="create invoice"
                handleAddMoreServices={(e, data) => {
                  //handleSendingInvoice(data);
                  // console.log("the data when creating invoice", data);
                  handleSendingInvoice(data);
                  //   setClientInfo(data);
                  //   setOpenCustomModal(true);
                }}
              />
            )}
          </Card>
        </div>
      </Row>
    </>
  );
}

export default ClientServiceList;
