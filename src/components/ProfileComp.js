import React from "react";
import Transaction from "./Transaction";
import { API } from "../config/api";
import { useQuery } from "react-query";

import profile from "../assets/Rectangle 12profile.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ProfileComp() {
  let { data: transaction } = useQuery("traans", async () => {
    const response = await API.get("/transaction-id");
    return response.data.data;
  });

  
  console.log(transaction);
  return (
    <Container fluid className="w-75 m-auto mt-5">
      <Row>
        <Col>
          <Row>
            <Col>
              <h3 className="mb-4" style={{ color: "#BD0707" }}>
                My Profile
              </h3>
              <img src={profile} alt="Foto Profile" className="w-100 rounded" />
            </Col>
            <Col>
              <h3 className="mb-5" style={{ color: "white" }}>
                New
              </h3>
              <div className="fw-semibold">
                <p className="mb-0" style={{ color: "#613D2B", fontSize: 25 }}>
                  Full Name
                </p>
                <p>{transaction?.user?.name}</p>
              </div>
              <div className="fw-semibold">
                <p className="mb-0" style={{ color: "#613D2B", fontSize: 25 }}>
                  Email
                </p>
                <p>{transaction?.user?.email}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={7}>
          <h3 className="mb-4" style={{ color: "#613D2B" }}>
            My Transaction
          </h3>
          <div style={{ height: "350px", overflow: "auto"}}>
          <Transaction data={ transaction} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
