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
import { useState } from "react";

import FormHelperText from "@mui/material/FormHelperText";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { getAllServiceTypes } from "services/service-types/service-types";

export default function ClientsServicesForm() {
  const [clientName, setClientName] = useState();
  const [serviceType, setServiceType] = useState();
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

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="App">
      <AppBar>
        <toolbar>
          <h1>Services</h1>
        </toolbar>
      </AppBar>

      <Typography style={{ marginTop: "1rem" }} variant="h5">
        Attach Services to a user{" "}
      </Typography>
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="client Name"
          variant="outlined"
          onChange={(e) => setClientName(e.target.value)}
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}

        {/* <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Service Type"
          variant="outlined"
          onChange={(e) => setServiceType(e.target.value)}
        /> */}

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="datetime-local"
          label="Start Date"
          variant="outlined"
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="datetime-local"
          label="End Date"
          variant="outlined"
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Tax"
          variant="outlined"
          onChange={(e) => setTax(e.target.value)}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="quantity"
          variant="outlined"
          onChange={(e) => setQuantity(e.target.value)}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          label="price"
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="currency"
          variant="outlined"
          onChange={(e) => setCurrency(e.target.value)}
        />

        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={4}
          style={{ width: "80%", margin: "5px" }}
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
        >
          save
        </Button>
      </form>
    </div>
  );
}
