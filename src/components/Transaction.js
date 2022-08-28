import React from "react";

import Logo from "../assets/logo-brand.png";
import formatPrice from "../utils/formatPrice";
import Barcode from "../assets/Groupbarcode.png";

import { API } from "../config/api";
import { useQuery } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Transaction() {
  let { data: transactions } = useQuery("transCache", async () => {
    const response = await API.get("/transaction1");
    return response.data.data;
  });
  // let Total = transaction?.carts?.reduce((a, b) => {
  //   return a + b.sub_amount;
  // }, 0);
  console.log(transactions);
  return (
    <>
    {transactions?.map((items, index) => (
    <Container
      className="p-4 overflow-auto rounded-4 mb-2"
      style={{ backgroundColor: "#F6DADA" }}
      >
      <Row>
          {items?.carts?.map((cart, idx) => (
        <Col md={8}>
            <Row className="mb-3">
              <Col sm={4}>
                <img
                  src={cart?.product?.image}
                  alt="aa"
                  style={{ width: 100 }}
                />
              </Col>
              <Col sm={8}>
                <div>
                  <h5>{cart?.product?.name}</h5>
                  <p>ID Order : {cart?.id}</p>
                </div>
                <div className="mt-1" style={{ fontSize: 15 }}>
                  <p className="my-1">
                    Topping :{" "}
                    {cart?.toping.map((items, index) => items?.name).join(", ")}
                  </p>
                  <p className="my-1">
                    Price : {formatPrice(cart?.sub_amount)}
                  </p>
                </div>
              </Col>
            </Row>
        </Col>
          ))}
          
        <Col md={4} className="text-center">
          <img className="w-50" src={Logo} alt="" />
          <br />
          <br />
          <img src={Barcode} alt="" />
          <div
            className="text-center w-75 m-auto my-3 fw-semibold"
            style={{
              backgroundColor: "rgba(0, 209, 255, .3)",
              color: "#00D1FF",
            }}
          >
            {items?.status}
          </div>
          <div className="text-center w-75 m-auto my-3 fw-normal">
            Subtotal:{formatPrice(items?.total)}
          </div>
              </Col>
          </Row>
    </Container>
    ))}
      
    </>
  );
}
