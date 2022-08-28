import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

import { UserContext } from "../utils/CreateContext";
import User from "../assets/user 2User.png";
import Logout from "../assets/logout 1Logout.png";
import Foto from "../assets/isLogin/Ellipse 1isLogin.png";
import Cart from "../assets/isLogin/VectorisLogin.png";
import LogoBrand from "../assets/logo-brand.png";
import { Button, Alert, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import ButtonSubmit from "./inputForm/Button";
import Cup from "../assets/cup.png";
import Topping from "../assets/topping.png";

function Header(props) {
  //transaction Query
  let { data: transaction } = useQuery("products", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  let profilPict = <img src={Foto} alt="122" />;
  // StateRegister
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = form;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // StateLogin
  const [formLog, setFormLog] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const { emailLogin, passwordLogin } = formLog;

  const handleChangeLog = (e) => {
    setFormLog({
      ...formLog,
      [e.target.name]: e.target.value,
    });
  };

  // modalState
  const [show, setShow] = useState(false);
  const [reg, setReg] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const regClose = () => setReg(false);
  const regShow = () => setReg(true);

  // UseContext
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (reg) {
      handleClose();
    }
  }, [reg]);

  useEffect(() => {
    if (show) {
      regClose();
    }
  }, [show]);

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({
      type: "AUTH_ERROR",
    });
    navigate("/");
  };

  // handleSubmit REGISTER
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);
      // Notification
      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
        await delay(1000);
        regClose();
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  // HandleSubmit LOGIN
  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const reqBody = JSON.stringify(formLog);

      // Insert data user to database
      const response = await API.post("/login", reqBody, config);
      console.log(response);
      // const { status, name, email, token } = response.data.data
      if (response?.data.code === 200) {
        if (response.data.data.status === "customer") {
          dispatch({
            type: "LOGIN_USER",
            payload: response.data.data,
          });
        } else if (response.data.data.status === "admin") {
          dispatch({
            type: "ADMIN",
            payload: response.data.data,
          });
        } else {
          navigate("/");
        }
      }
      handleClose();
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={LogoBrand}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="logo brand"
            />
          </Link>
        </Navbar.Brand>

        <div className="d-flex">
          {state.user.status === "customer" ? (
            <>
              <Nav className="me-auto">
                <Link to="/Cart">
                  <img src={Cart} alt="Logo" className="mt-3 me-2" />
                </Link>
                <span className="rounded-circle">
                  {/* {props.count} */}
                  {transaction?.carts?.length}
                </span>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={profilPict}
                  menuVariant="light"
                >
                  <NavDropdown.Item>
                    <Link
                      to="/Profile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img src={User} alt="User" style={{ height: 30 }} />{" "}
                      <span style={{ fontWeight: 600 }}>Profile</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleLogOut()} href="/">
                    <img src={Logout} alt="User" style={{ height: 30 }} />{" "}
                    <span style={{ fontWeight: 600 }}>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : state.user.status === "admin" ? (
            <>
              <Nav className="me-auto">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={profilPict}
                  menuVariant="light"
                >
                  <NavDropdown.Item>
                    <Link
                      to="/addProduct"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img src={Cup} alt="User" style={{ height: 30 }} />{" "}
                      <span style={{ fontWeight: 600 }}>Add Product</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/addToping"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img src={Topping} alt="User" style={{ height: 30 }} />{" "}
                      <span style={{ fontWeight: 600 }}>Add Topping</span>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleLogOut()} href="/">
                    <img src={Logout} alt="User" style={{ height: 30 }} />{" "}
                    <span style={{ fontWeight: 600 }}>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              {" "}
              <Button
                variant="outline-danger"
                className="px-4"
                onClick={handleShow}
              >
                Login
              </Button>
              <Button variant="danger" className="px-4 ms-2" onClick={regShow}>
                Register
              </Button>{" "}
            </>
          )}

          {/* ini Modal */}
          <Modal className="p-4" show={show} onHide={handleClose}>
            <h1 className="m-3 mb-0" style={{ color: "#BD0707" }}>
              Login
            </h1>
            {message && message}
            <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
              <Modal.Body>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={emailLogin}
                  name="emailLogin"
                  onChange={handleChangeLog}
                  className="px-3 py-2 mt-3"
                />
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={passwordLogin}
                  name="passwordLogin"
                  onChange={handleChangeLog}
                  className="px-3 py-2 mt-3"
                />
              </Modal.Body>
              <ButtonSubmit type="submit" text="LOGIN" />
            </Form>
            <p className="text-center mt-3">
              Dont have an Account? click{" "}
              <button
                className="link"
                style={{
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "white",
                  padding: 0,
                }}
                onClick={regShow}
              >
                here
              </button>
            </p>
          </Modal>

          <Modal className="p-4" show={reg} onHide={regClose}>
            <h1 className="m-3 mb-1" style={{ color: "#BD0707" }}>
              Register
            </h1>
            {message && message}
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  className="px-3 py-2"
                />
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                />
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                />
              </Modal.Body>
              <ButtonSubmit type="submit" text="REGISTER" />
            </Form>
            <div className="text-center my-3">
              Already have an account ? Click{" "}
              <button
                className="link"
                style={{
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "white",
                  padding: 0,
                }}
                onClick={handleShow}
              >
                here
              </button>
            </div>
          </Modal>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
