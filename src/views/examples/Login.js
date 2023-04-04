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
import { useState, useEffect } from "react";
import AxiosApi from "services/api/AxiosApi";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Lottie from "lottie-react";
import OpenEye from "../../assets/mylotties/83983-eye-icon.json";
import CustomIsLoading from "components/loading/CustomIsLoading";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState();
  const [type, setType] = useState(false);

  const { login, errors, isLoading, getUser, user } = useAuthContext();

  useEffect(() => {
    //check if user is still logged in

    const checkuser = async () => {
      const { data } = await AxiosApi.get("/api/user");
      if (data) {
        navigate("/admin/dashboard");
      }
      console.log("user : ", data);
    };
    checkuser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
              <small>Sign In With Your credentials</small>
            </div>
            {isLoading && <CustomIsLoading />}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
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
                      <span
                        onClick={() => setType(!type)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="ni ni-lock-circle-open" />
                      </span>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={!type ? "password" : "text"}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <span
                        onClick={() => setType(!type)}
                        style={{ cursor: "pointer" }}
                      >
                        {!type ? (
                          <VisibilityOffIcon />
                        ) : (
                          <Lottie
                            animationData={OpenEye}
                            style={{ width: "25px" }}
                            loop={true}
                            autoplay={true}
                          />
                        )}
                      </span>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errors && (
                  <small className="text-danger">
                    {Array.isArray(errors?.password)
                      ? errors?.password[0]
                      : errors?.password}
                  </small>
                )}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  onChange={(e) => setRememberMe(e.target.value)}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;
