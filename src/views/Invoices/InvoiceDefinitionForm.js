// ClientsServicesForm;

// import "./styles.css";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box
} from "@material-ui/core";
import { useState, useEffect } from "react";

import FormHelperText from "@mui/material/FormHelperText";
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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { getAllServiceTypes } from "services/service-types/service-types";
import { addServiceStates } from "services/service-states/service-states";

import {
  addInvoiceAddress,
  getAllInvoiceAddress,
  updateInvoiceAddress
} from "services/invoice-address/invoice-address";
import CustomIsLoading from "components/loading/CustomIsLoading";

export default function InvoiceDefinitionForm() {
  const [invoiceAddressData, setInvoiceAddressData] = useState([]);
  console.log("invoiceAddressData is : ", invoiceAddressData);
  console.log(
    " invoiceAddressData?.invoice_company_name is : ",
    invoiceAddressData[0]?.invoice_company_name
  );

  const [invoiceCompanyName, setInvoiceCompanyName] = useState();
  const [InvoiceAddress, setInvoiceAddress] = useState();
  const [invoicePoBox, setInvoicePoBox] = useState();
  const [invoicePhoneNumber, setInvoicePhoneNumber] = useState();
  const [invoiceEmail, setInvoiceEmail] = useState();
  const [invoiceNote, setInvoiceNote] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();

  const [formvalidation, setFormValidation] = useState();

  // get all invoice address info
  const getAllInvoiceTheAddress = async () => {
    try {
      setIsLoading(true);
      let response = await getAllInvoiceAddress();
      console.log("reponse for fetching  getAllInvoiceAddress : ", response);
      setInvoiceAddressData(response.data);
      setInvoiceCompanyName(response.data[0]?.invoice_company_name);
      setInvoiceAddress(response.data[0]?.invoice_address);
      setInvoicePoBox(response.data[0]?.invoice_pobox);
      setInvoicePhoneNumber(response.data[0]?.invoice_phonenumber);
      setInvoiceEmail(response.data[0]?.invoice_email);
      setInvoiceNote(response.data[0]?.invoice_note);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  //create invoice address
  const handleAddInvoicesAddress = async (data) => {
    try {
      setIsLoading(true);
      let response = await addInvoiceAddress(data);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      alert("Invoice Address added succesfuly");
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  //update form data
  const handleUpdateAddInvoicesAddress = async (id, data) => {
    try {
      setIsLoading(true);
      console.log("the handleUpdateAddInvoicesAddress data is : ", data);
      let response = await updateInvoiceAddress(id, data);
      console.log("the handleUpdateAddInvoicesAddress reponse is : ", response);
      setIsLoading(false);
      alert("data updated successfully");
      getAllInvoiceTheAddress();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error handleRowUpdate is : ", err);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormValidation();
    if (
      !invoiceCompanyName ||
      !InvoiceAddress ||
      !invoicePoBox ||
      !invoicePhoneNumber ||
      !invoiceEmail ||
      !invoiceNote
    ) {
      // setFormValidation({ message: "you should fill up all fields" });
      alert("you should fill up all fields before submiting");
    } else {
      let data = {
        invoice_company_name: invoiceCompanyName,
        invoice_address: InvoiceAddress,
        invoice_pobox: invoicePoBox,
        invoice_phonenumber: invoicePhoneNumber,
        invoice_email: invoiceEmail,
        invoice_note: invoiceNote
      };
      console.log("the data on submit : ", data);
      invoiceAddressData.length > 0
        ? handleUpdateAddInvoicesAddress(invoiceAddressData[0]?.id, data)
        : handleAddInvoicesAddress(data);

      setFormValidation();
    }
  };

  useEffect(() => {
    console.log("hei im in the use effect");
    getAllInvoiceTheAddress();
  }, []);

  return (
    <Row>
      <div className="col">
        <Card className="shadow" style={{ padding: "1rem" }}>
          {/* <AppBar>
        <toolbar>
          <h1>Services</h1>
        </toolbar>
      </AppBar> */}
          <CardHeader className="border-0">
            {isLoading && <CustomIsLoading />}
            Define the Invoice Params
            {formvalidation && (
              <small style={{ color: "red" }}>{formvalidation.message}</small>
            )}
          </CardHeader>

          <form>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="company name"
              variant="outlined"
              value={invoiceCompanyName}
              onChange={(e) => setInvoiceCompanyName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="invoice address"
              variant="outlined"
              value={InvoiceAddress}
              onChange={(e) => setInvoiceAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="invoice email"
              variant="outlined"
              value={invoiceEmail}
              onChange={(e) => setInvoiceEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="invoice phonenumber"
              variant="outlined"
              value={invoicePhoneNumber}
              onChange={(e) => setInvoicePhoneNumber(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-multiline-static"
              label="invoice pobox"
              multiline
              rows={4}
              style={{ width: "80%", margin: "5px" }}
              value={invoicePoBox}
              onChange={(e) => setInvoicePoBox(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              id="outlined-multiline-static"
              label="invoice note"
              multiline
              rows={4}
              style={{ width: "80%", margin: "5px" }}
              value={invoiceNote}
              onChange={(e) => setInvoiceNote(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              style={{ width: "200px", margin: "5px" }}
              variant="contained"
              color="primary"
              onClick={handleSubmitForm}
            >
              {invoiceAddressData.length > 0 ? "update" : "save"}
            </Button>
          </form>
        </Card>
      </div>
    </Row>
  );
}
