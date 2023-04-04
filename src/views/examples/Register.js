// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { useState } from "react";
import AxiosApi from "services/api/AxiosApi";
import useAuthContext from "context/AuthContext";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  // const [errors, setErrors] = useState();
  const [pwdError, setPwdError] = useState();
  const { register, errors, isLoading } = useAuthContext();

  const csrf = () => AxiosApi.get("/sanctum/csrf-cookie");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("please first agree with our terms and conditions");
    } else if (password.length !== password_confirmation.length) {
      setPwdError(true);
    } else {
      register({ name, email, password, password_confirmation });
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with your credentials</small>
            </div>
            {isLoading && (
              <div>
                <h3>loading...</h3>
              </div>
            )}
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                {errors && (
                  <small className="text-danger">
                    {Array.isArray(errors?.name)
                      ? errors?.name[0]
                      : errors?.name}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                {errors && (
                  <small className="text-danger">
                    {Array.isArray(errors?.email)
                      ? errors?.email[0]
                      : errors?.email}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                {errors && (
                  <small className="text-danger">
                    {Array.isArray(errors?.password)
                      ? errors?.password[0]
                      : errors?.password}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Repeat Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                  />
                </InputGroup>
                {pwdError && (
                  <small className="text-danger">passwords dont match</small>
                )}
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span
                    className={
                      password.length > 8 || password_confirmation.length > 8
                        ? `text-success font-weight-70`
                        : `text-danger font-weight-700`
                    }
                  >
                    strong
                  </span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onChange={(e) => {
                        setAgreeTerms(!agreeTerms);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="mt-4"
                  color="primary"
                  type="button"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
