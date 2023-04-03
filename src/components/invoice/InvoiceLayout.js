import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import "./invoicestyles.css";
import NewWaveLogo from "../../assets/myfiles/New Wave logo.jpg";
import { Button } from "reactstrap";
import moment from "moment";

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
import { sendManualInvoice } from "services/invoices/invoices";
export default function InvoiceLayout({
  id,
  client_address,
  client_email,
  client_name,
  client_phonenumber,
  client_pobox,
  invoice_address,
  invoice_company_name,
  invoice_email,
  invoice_id,
  invoice_note,
  invoice_phonenumber,
  invoice_pobox,
  invoice_tin,
  service_states_currency,
  service_states_description,
  service_states_end_date,
  service_states_price,
  service_states_quantity,
  service_states_start_date,
  service_states_tax,
  service_types_name
}) {
  const [isLoading, setIsLoading] = useState();
  const invoiceComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => invoiceComponentRef.current
  });
  // sendManualInvoice;
  const handleSendInvoice = async () => {
    setIsLoading(true);
    try {
      const response = await sendManualInvoice(id);
      setIsLoading(false);
      console.log(
        "the response after sending the maual invoice is : ",
        response
      );
      if (response.status == 200) {
        alert("invoice sent");
      } else {
        alert("Ummm! something wrong");
      }
    } catch (err) {
      setIsLoading(false);
      alert("there was an error sending invoice");
    }
  };

  return (
    <>
      <div className="invoiceContainer" ref={invoiceComponentRef}>
        <div className="logoinvoice">
          <div>
            <img src={NewWaveLogo} alt="new wave logo" />
          </div>
          <div>
            <div>
              <h1>Invoice</h1>
            </div>
            <p>TIN # {invoice_tin}</p>
            <p>INVOICE {invoice_id}</p>
            <p>DATE: {moment().format("lll")}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{invoice_company_name}</p>
            <p>{invoice_address}</p>
            <p>{invoice_pobox}</p>
            <p>{invoice_phonenumber}</p>
            <p>{invoice_email}</p>
          </div>
          <div className="senderadd">
            <h3>INVOICE:</h3>
            <p>{client_name}</p>
            <p>{client_address}</p>
            <p>{client_pobox}</p>
            <p>{client_email}</p>
          </div>
        </div>
        <div>
          <table>
            <tr>
              <th>QUANTITY</th>
              <th>DESCRIPTION</th>
              <th>UNIT PRICE (UGX)</th>
              <th>TOTAL (UGX)</th>
            </tr>
            <tr>
              <td>{service_states_quantity}</td>
              <td>{service_states_description}</td>
              <td>{service_states_price}</td>
              <td>
                {parseInt(service_states_quantity) *
                  parseInt(service_states_price)}
              </td>
            </tr>
            <tr>
              <td rowspan="3" colspan="2">
                PAYMENT
              </td>
              <td>SUBTOTAL</td>
              <td>
                {" "}
                {parseInt(service_states_quantity) *
                  parseInt(service_states_price)}
              </td>
            </tr>
            <tr>
              <td>TAX ({service_states_tax}% VAT)</td>
              <td>
                {(parseInt(service_states_tax) / 100) *
                  parseInt(service_states_price)}
              </td>
            </tr>
            <tr>
              <td>TOTAL DUE</td>
              <td>
                {parseInt(service_states_quantity) *
                  parseInt(service_states_price) +
                  (parseInt(service_states_tax) / 100) *
                    parseInt(service_states_price)}
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <div>
                  <h1>Note</h1>
                  <p style={{ lineHeight: "1.5" }}>{invoice_note}</p>
                  {/* <ul>
                    <li>Payment Terms: Due on receipt</li>
                    <li>
                      Make payments in favor of “New Wave Technologies Ltd”
                      Bank: Bank of Africa Uganda Limited, Equatorial Branch,{" "}
                    </li>
                    <li>
                      Account Number: 20207309001, Currency: UGX, Swift Code:
                      AFRIUGKA
                    </li>
                    <li>All prices exclusive of VAT unless otherwise stated</li>
                    <li>
                      If you have any questions concerning this invoice,
                      contact: Email: info@nwt.ug, Tel: 0414-389220
                    </li>
                  </ul> */}
                </div>
              </td>
            </tr>
            <tr>
              {" "}
              <td colspan="4">
                <center>Thank you for your business!</center>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <center>{isLoading && "Sending..."}</center>
      </div>
      <div className="printbutton">
        <Button outline color="primary" onClick={handlePrint}>
          Print Invoice
        </Button>
        <Button outline color="primary" onClick={handleSendInvoice}>
          Send Invoice
        </Button>
      </div>
    </>
  );
}
