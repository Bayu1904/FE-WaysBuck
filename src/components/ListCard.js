import React from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formatPrice from "../utils/formatPrice";
// import { UserContext } from "../utils/CreateContext";
// import LandingPage from "../pages/Landingpages";

export default function ListCard() {
  // const [state] = useContext(UserContext);
  // let isLogin = state.isLogin;
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  console.log(products);

  return (
    <Container className="my-5">
      <h1 className="mt-5">Lets Order </h1>
      <Row>
        {products?.map((items, index) => (
          <Col className="mt-4">
            <Card
              key={index}
              className="pe-auto"
              style={{
                width: "15.063rem",
                border: 0,
                borderRadius: 10,
                backgroundColor: "#F6DADA",
              }}
            >
              <Link
                to={"/detail/" + items.id}
                className=" text-decoration-none"
              >
                <Card.Img
                  variant="top"
                  src={items.image}
                  className="rounded"
                  style={{ height: "19.5rem" }}
                />
                <Card.Body>
                  <p
                    className="fw-bold text-danger"
                    style={{ fontSize: "18px", margin: 0 }}
                  >
                    {items.name}
                  </p>
                  <p style={{ color: "#974A4A", margin: 0 }}>
                    {formatPrice(items.price)}
                  </p>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
