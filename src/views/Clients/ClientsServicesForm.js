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

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { getAllServiceTypes } from "services/service-types/service-types";
import { addServiceStates } from "services/service-states/service-states";

export default function ClientsServicesForm({ clientInfo }) {
  console.log("clientInfo is : ", clientInfo);
  const [clientName, setClientName] = useState(clientInfo.client_name);
  const [serviceTypeId, setServiceTypeId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tax, setTax] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [currency, setCurrency] = useState();
  const [description, setDescription] = useState();
  //   const [deliveryDate, setDeliveryDate] = useState("");

  //   const minDateTime = new Date();
  //   minDateTime.setHours(17);
  //   const maxDateTime = new Date();
  //   maxDateTime.setHours(20);

  //   console.log("min", minDateTime.toISOString().slice(0, 16));
  //   console.log("max", maxDateTime.toISOString().slice(0, 16));

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [lookupData, setLookUpData] = useState();
  const [selectOptionsData, setSelectOptionsData] = useState([]);
  const [formvalidation, setFormValidation] = useState();

  //    { id: 2, service_name: "web hosting", registras_id: 1 }
  const getAllTheServiceTypes = async () => {
    try {
      setIsLoading(true);
      let response = await getAllServiceTypes();
      console.log("reponse for fetching service types zzzzzz: ", response);
      setSelectOptionsData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //Add Service State
  const handleAddServiceState = async (data) => {
    try {
      setIsLoading(true);
      let response = await addServiceStates(data);
      console.log("the reponse is : ", response);
      setIsLoading(false);
      alert("service added succesfuly");
      setClientName();
      setServiceTypeId();
      setStartDate();
      setEndDate();
      setTax();
      setQuantity();
      setPrice();
      setCurrency();
      setDescription();
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response.data);
      console.log("error is : ", err);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormValidation();
    if (
      serviceTypeId == "none" ||
      !serviceTypeId ||
      !startDate ||
      !endDate ||
      !tax ||
      !quantity ||
      !price ||
      !currency ||
      !description ||
      !clientInfo.id
    ) {
      // setFormValidation({ message: "you should fill up all fields" });
      alert("you should fill up all fields before submiting");
    } else {
      let data = {
        service_type_id: parseInt(serviceTypeId),
        start_date: startDate,
        end_date: endDate,
        tax: parseInt(tax),
        quantity: parseInt(quantity),
        price: parseInt(price),
        currency: currency,
        description: description,
        client_id: clientInfo.id
      };
      console.log("the data on submit : ", data);
      handleAddServiceState(data);
      setFormValidation();
    }
  };
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    console.log("hei im in the use effect");
    getAllTheServiceTypes();
  }, []);
  console.log("selectOptionsData is : ", selectOptionsData);

  return isLoading ? (
    <h1>isLoading...</h1>
  ) : (
    <div className="App">
      {/* <AppBar>
        <toolbar>
          <h1>Services</h1>
        </toolbar>
      </AppBar> */}

      <Typography
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        variant="h5"
      >
        Attach services to {clientName}.
        {formvalidation && (
          <small style={{ color: "red" }}>{formvalidation.message}</small>
        )}
      </Typography>
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="client Name"
          variant="outlined"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          disabled
        />

        {/* <FormHelperText>With label + helper text</FormHelperText> */}

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="datetime-local"
          label="Start Date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="datetime-local"
          label="End Date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="Tax"
          variant="outlined"
          onChange={(e) => setTax(e.target.value)}
          value={tax}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="quantity"
          variant="outlined"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="currency"
          variant="outlined"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        />

        <div style={{ width: "80%", display: "inline-block" }}>
          <Label for="exampleSelect">Service Type</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={serviceTypeId}
            onChange={(e) => setServiceTypeId(e.target.value)}
          >
            <option>none</option>
            {selectOptionsData.map((row, id) => (
              <option value={row.id} key={id}>
                {row.service_name}
              </option>
            ))}
          </Input>
        </div>
        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={2}
          style={{ width: "80%", margin: "5px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* <TextField
          id="date"
          label="Delivery Date"
          type="datetime-local"
          color="secondary"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          inputProps={{
            min: minDateTime.toISOString().slice(0, 16),
            max: maxDateTime.toISOString().slice(0, 16)
          }}
          InputLabelProps={{ shrink: true }}
        /> */}

        <Button
          style={{ width: "200px", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmitForm}
        >
          save
        </Button>
      </form>
    </div>
  );
}
