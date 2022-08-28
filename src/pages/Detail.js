import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonSubmit from "../components/inputForm/Button";

export default function Detail() {
  let navigate = useNavigate();
  const { id } = useParams();

  // handle logic for product
  let { data: product } = useQuery("product", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  let { data: topings } = useQuery("topingsCache", async () => {
    const response = await API.get("/topings");
    return response.data.data;
  });

  // topingHandler
  const [toping, setToping] = useState([]);
  const [topingId, setTopingId] = useState([]);

  const handleChange = (e) => {
    console.log(e);
    let updateToping = [...toping];
    if (e.target.checked) {
      updateToping = [...toping, e.target.name];
    } else {
      updateToping.splice(toping.indexOf(e.target.name), 1);
    }
    setToping(updateToping);

    let updateTopingId = [...topingId];
    if (e.target.checked) {
      updateTopingId = [...topingId, parseInt(e.target.id)];
    } else {
      updateTopingId.splice(topingId.indexOf(e.target.value));
    }
    setTopingId(updateTopingId);
  };

  let resultTotal = toping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);

  let { data: transaction_id } = useQuery("trans", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  // Handle for Add to cart
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();
      if (transaction_id === undefined) {
        API.post("/transaction");
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        product_id: product.id,
        toping_id: topingId,
        sub_amount: resultTotal + product?.price,
        transaction_id: transaction_id.id,
      };

      const body = JSON.stringify(data);

      API.post("/cart", body, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Header />
      <Container className="w-75 mt-5">
        <Row>
          <Col md={5}>
            <img src={product?.image} alt="" className="w-100" />
          </Col>
          <Col md={7}>
            <h1 style={{ color: "#BD0707" }}>{product?.name}</h1>
            <h4 style={{ color: "#974A4A" }}>{formatPrice(product?.price)}</h4>

            <Container className="mt-5">
              <h4 className="mb-4" style={{ color: "#974A4A" }}>
                Toping
              </h4>
              <Row>
                {topings?.map((items, index) => (
                  <Col md={3} className="text-center mb-3" key={index}>
                    <input
                      type="checkbox"
                      name={items.price}
                      id={items.id}
                      onChange={handleChange}
                      className="toppingCeckbox"
                      value={index}
                    />
                    <label htmlFor={items.id}>
                      <img
                        src={items.image}
                        alt="123"
                        id="toping"
                        style={{ cursor: "pointer", width: "100px" }}
                      />
                    </label>
                    <p htmlFor="toping">{items.name}</p>
                  </Col>
                ))}
              </Row>
              <Row className="mt-5">
                <Col>
                  <h4 style={{ color: "#974A4A" }}>Total</h4>
                </Col>
                <Col>
                  <h4 className="text-end" style={{ color: "#974A4A" }}>
                    {formatPrice(resultTotal + product?.price)}
                  </h4>
                </Col>
              </Row>
              <ButtonSubmit
                text="Add to Cart"
                onClick={(e) => handleAddToCart.mutate(e)}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
