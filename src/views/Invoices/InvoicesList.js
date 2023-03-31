// import React, { useState } from "react";
// import MuiTable from "components/MuiTable";

// function InvoicesList() {
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

// export default InvoicesList;

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
import { getAllInvoices, deleteInvoices } from "services/invoices/invoices";
import CustomModal from "components/CustomModal/CustomModal";
import InvoiceLayout from "components/invoice/InvoiceLayout";

function InvoicesList() {
  const [openInvoiceModal, setOpenInvoiceNodal] = useState();
  const handleShowInvoice = (e) => {
    e.preventDefault();
    setOpenInvoiceNodal(true);
  };
  const columns = [
    {
      title: "client_name",
      field: "invoice_company_name",
      editable: false,
      cellStyle: {
        minWidth: 210,
        maxWidth: 210
      },
      render: (rowData) => (
        <span
          onClick={handleShowInvoice}
          style={{ cursor: "pointer", color: "blue" }}
        >
          <stron>{rowData.invoice_company_name}</stron>
        </span>
      )
    },
    { title: "invoice_id", field: "invoice_id", editable: false },
    {
      title: "invoice_service_type",
      field: "service_types_name",
      editable: false
    },
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

  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const [invoiceData, setInvoiceData] = useState();

  //    { id: 2, service_name: "web hosting", registras_id: 1 }
  //fetching Service types data

  //   created_at: "2023-03-29T15:36:07.000000Z";
  //   id: 1;
  //   invoice_address: "plot 128, old kira road";
  //   invoice_address_id: 1;
  //   invoice_company_name: "New wave technologies";
  //   invoice_email: "info@nwt.ug";
  //   invoice_id: "202303296769";
  //   invoice_note: "Aluta continua";
  //   invoice_phonenumber: "+256414389220";
  //   invoice_pobox: "P.O Box 24159\nKampala, Uganda";
  //   invoice_tin: "1000292703";
  //   service_state_id: 1;
  //   service_states_currency: "ugx";
  //   service_states_description: "domain hosting service";
  //   service_states_end_date: "2023-03-31 01:51:00";
  //   service_states_id: 1;
  //   service_states_price: 455;
  //   service_states_quantity: 1;
  //   service_states_start_date: "2023-03-29 01:51:00";
  //   service_states_tax: 45;
  //   service_types_id: 2;
  //   service_types_name: "domain renewal";
  //   updated_at: "2023-03-29T15:36:07.000000Z";
  //fetching all invoices data
  const getAllTheInvoices = async () => {
    try {
      setIsLoading(true);
      let response = await getAllInvoices();
      console.log("reponse for fetching invoices : ", response);
      setInvoiceData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //calling all function synchronusly to fetch data
  const fetchAllTableData = async () => {
    await getAllTheInvoices();
    return;
  };
  useEffect(() => {
    fetchAllTableData();
  }, []);

  // tableRowDelete
  const handleRowDelete = async (data) => {
    console.log("handle delete data is  : ", data.id);
    try {
      setIsLoading(true);
      let response = await deleteInvoices(data.id);
      console.log("the handleRowDelete reponse is : ", response);
      setIsLoading(false);
      getAllTheInvoices();
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
          <Card className="shadow" style={{ padding: "1rem" }}>
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
              tableData={invoiceData}
              setTableData={setInvoiceData}
              loading={isLoading}
              tableRowDelete={handleRowDelete}
              tableTitle="List Of all Services"
              showAddMoreServices={false}
              showRowAdd={false}
              hideShowRowDelete={false}
              hideShowRowUpdate={true}
            />
            {/* open = false handleClose */}
            <CustomModal
              open={openInvoiceModal}
              handleClose={() => setOpenInvoiceNodal(false)}
            >
              <InvoiceLayout />
            </CustomModal>
          </Card>
        </div>
      </Row>
    </>
  );
}

export default InvoicesList;
