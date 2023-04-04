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
import {
  getInvoicesByClientId,
  deleteInvoices
} from "services/invoices/invoices";
import CustomModal from "components/CustomModal/CustomModal";
import InvoiceLayout from "components/invoice/InvoiceLayout";
import CustomIsLoading from "components/loading/CustomIsLoading";

function ClientInvoiceList({ clientInfo }) {
  const [openInvoiceModal, setOpenInvoiceNodal] = useState();
  const [selectedRowData, setSelectedRowData] = useState();
  const handleShowInvoice = (e, rowData) => {
    e.preventDefault();
    setSelectedRowData(rowData);
    setOpenInvoiceNodal(true);
  };
  const columns = [
    {
      title: "Client Name",
      field: "client_name",
      editable: false,
      cellStyle: {
        minWidth: 210
      },
      render: (rowData) => {
        //console.log("row data is : ", rowData);

        return (
          <span
            onClick={(e) => handleShowInvoice(e, rowData)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <stron>{rowData.client_name}</stron>
          </span>
        );
      }
    },
    {
      title: "Invoice Id",
      field: "invoice_id",
      editable: false,
      cellStyle: {
        minWidth: 210
      }
    },
    {
      title: "Invoice Service Type",
      field: "service_types_name",
      editable: false,
      cellStyle: {
        minWidth: 210
      }
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

  const [tableColumns, setTableColumns] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const [invoiceData, setInvoiceData] = useState();

  //    { id: 2, service_name: "web hosting", registras_id: 1 }
  //fetching Service types data

  // client_address: "kampalaroad";
  // client_email: "mtn@gmail.com";
  // client_id: 2;
  // client_name: "mtn";
  // client_phonenumber: "98978";
  // client_pobox: "po.box 3433";
  // created_at: "2023-03-30T10:35:12.000000Z";
  // id: 2;
  // invoice_address: "plot 128, old kira road";
  // invoice_address_id: 1;
  // invoice_company_name: "New wave technologies";
  // invoice_email: "info@nwt.ug";
  // invoice_id: "202303303869";
  // invoice_note: "Aluta continua";
  // invoice_phonenumber: "+256414389220";
  // invoice_pobox: "P.O Box 24159\nKampala, Uganda";
  // invoice_tin: "1000292703";
  // service_state_id: 1;
  // service_states_currency: "ugx";
  // service_states_description: "domain hosting service";
  // service_states_end_date: "2023-03-31 01:51:00";
  // service_states_id: 1;
  // service_states_price: 455;
  // service_states_quantity: 1;
  // service_states_start_date: "2023-03-29 01:51:00";
  // service_states_tax: 45;
  // service_types_id: 2;
  // service_types_name: "domain renewal";
  // updated_at: "2023-03-30T10:35:12.000000Z";

  //fetching all invoices data
  const getAllTheInvoicesByClientId = async () => {
    console.log("client info is : ", clientInfo);
    try {
      setIsLoading(true);
      let response = await getInvoicesByClientId(clientInfo.id);
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
    await getAllTheInvoicesByClientId();
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
      getAllTheInvoicesByClientId();
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
              <h3 className="mb-0">{`List Of All Invoices Attached To ${clientInfo.client_name}`}</h3>
            </CardHeader>
            {errors && (
              <p style={{ color: "red" }}>
                There are semantic errors in your data
              </p>
            )}
            {isLoading && <CustomIsLoading />}
            <MuiTable
              tableColumns={tableColumns}
              tableData={invoiceData}
              setTableData={setInvoiceData}
              loading={isLoading}
              tableRowDelete={handleRowDelete}
              tableTitle="Invoices"
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
              <InvoiceLayout {...selectedRowData} />
            </CustomModal>
          </Card>
        </div>
      </Row>
    </>
  );
}

export default ClientInvoiceList;
