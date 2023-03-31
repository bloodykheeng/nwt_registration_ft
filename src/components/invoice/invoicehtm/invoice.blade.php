<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/invoice.css"/>
    <title>Document</title>
</head>
<body>
     <div className="invoiceContainer" >
        <div className="logoinvoice">
          <div>
            <img src="/NewWavelogo.jpg" alt="new wave logo" />
          </div>
          <div>
            <div>
              <h1>Invoice</h1>
            </div>
            <p>TIN # 1000292703</p>
            <p>INVOICE #090105</p>
            <p>DATE: 09TH JANUARY 2023</p>
          </div>
        </div>
        <div>
          <div>
            <p>New Wave Technologies Ltd.</p>
            <p>Plot 128, Old Kira Road</p>
            <p>P. O. Box 24159</p>
            <p>Kampala, Uganda</p>
            <p>+256 41 4389 220</p>
            <p>info@nwt.ug</p>
          </div>
          <div className="senderadd">
            <h3>INVOICE:</h3>
            <p>SAS PROJECTS</p>
            <p>Shoal House Plot 76 Kampala Road</p>
            <p>P.O. Box 3876 Kampala, Uganda</p>
            <p>Tel: +256 414345325</p>
            <p>Email: sasclinic@sasprojects.co.ug</p>
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
              <td>1</td>
              <td>
                Domain renewal and Hosting for www.sasclinic.co.ug for a period
                of one year.
              </td>
              <td>500,000</td>
              <td>500,000</td>
            </tr>
            <tr>
              <td rowspan="3" colspan="2">
                PAYMENT:: UGANDA SHILLINGS FIVE HUNDRED NINETY THOUSAND ONLY
              </td>
              <td>SUBTOTAL</td>
              <td>500,000</td>
            </tr>
            <tr>
              <td>TAX (18% VAT)</td>
              <td>90,000</td>
            </tr>
            <tr>
              <td>TOTAL DUE</td>
              <td>590,000</td>
            </tr>
            <tr>
              <td colspan="4">
                <div>
                  <h1>Note</h1>
                  <ul>
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
                  </ul>
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
      <div className="printbutton">
        <button outline color="primary" onClick={handlePrint}>
          Print Invoice
        </button>
      </div>
</body>
</html>