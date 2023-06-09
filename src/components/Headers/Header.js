/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({ BackgroundObject, children }) => {
  return (
    <>
      {/* <div className="header bg-gradient-info"> */}
      <div className="header ">
        <div
          style={{
            pointerEvents: "none",
            background: "purple",
            height: "280px",
            width: "100%",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              pointerEvents: "none",
              background: "green",
              height: "800px",
              width: "100%"
            }}
            className="header bg-gradient-info"
          >
            {BackgroundObject}
          </div>
        </div>

        <div
          style={{
            pointerEvents: "none",

            maxHeight: "40%",
            marginTop: "-300px",
            overflow: "hidden"
          }}
        >
          <div style={{ minheight: "40%" }} className="pb-8 pt-5 pt-md-8">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                <Row>
                  {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Traffic
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          350,897
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}
                  {children}
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
