import React from "react";
import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import formatPrice from "../utils/formatPrice";
import "../assets/Topping/StyleToping.css";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

import ButtonSubmit from "../components/inputForm/Button";

export default function ListTopping(props) {
  let { data: topings } = useQuery("topingsCache", async () => {
    const response = await API.get("/topings");
    return response.data.data;
  });

  // topingHandler
  const [toping, setToping] = useState([]);
  let [topingId, setTopingId] = useState([]);

  const handleChange = (e) => {
    console.log(e);
    let updateToping = [...toping];
    if (e.target.checked) {
      updateToping = [...toping, e.target.name];
    } else {
      updateToping.splice(toping.indexOf(e.target.name));
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

  // Handle for Add to cart
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        product_id: props.product.id,
        toping_id: topingId,
        sub_amount: resultTotal,
      };

      const body = JSON.stringify(data);

      await API.post("/cart", body, config);

      console.log(topingId);
    } catch (error) {
      console.log(error);
    }
  });

  return (
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
              value={items.id}
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
            {formatPrice(resultTotal + props.product?.price)}
          </h4>
        </Col>
      </Row>
      <ButtonSubmit
        text="Add to Cart"
        handleLogin={(e) => handleAddToCart.mutate(e)}
      />
    </Container>
  );
}
