import { React, useEffect } from "react";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
// import ListOrder from '../components/listOrder'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import formatPrice from "../utils/formatPrice";
import Delete from "../assets/bin 1.png";
import Button from "../components/inputForm/Button";
import Header from "../components/Header";

export default function Cart() {
  let navigate = useNavigate();
  // Get data transaction by ID
  let { data: transaction, refetch } = useQuery("transCache", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  let handleDelete = async (id) => {
    await API.delete(`cart/${id}`);
    refetch();
  };

  // total Payment
  let Total = transaction?.carts?.reduce((a, b) => {
    return a + b.sub_amount;
  }, 0);
  console.log(Total);

  // pay Handler
  const form = {
    status: "failed",
    total: Total,
  };

  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.patch("/transactionID", body, config);

    console.log(response);

    const token = response.data.data.token;
    console.log(token);
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  // useEffect on Mitrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Header />
      <Container style={{ color: "#BD0707" }}>
        <h2 className="fw-bold">My Order</h2>
        <p>Review Your Order</p>
        <Row className="justify-content-between">
          <Col md={8}>
            <hr />
            <Container className="justify-content-between ">
              {transaction?.carts?.map((item, index) => (
                <Row style={{ fontSize: 14 }}>
                  <Col md={8} className="d-flex">
                    <div
                      className="rounded"
                      style={{
                        width: 80,
                        height: 80,
                        marginRight: 13,
                        marginBottom: 29,
                      }}
                    >
                      <img
                        src={item.product?.image}
                        alt="img"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 900 }}>{item.product.name}</p>
                      <p style={{ fontSize: 14 }}>
                        <span style={{ color: "#974A4A", fontWeight: 800 }}>
                          Toping{" "}
                        </span>
                        :{" "}
                        {item.toping
                          .map((items, index) => items.name)
                          .join(", ")}
                      </p>
                    </div>
                  </Col>
                  <Col
                    md={4}
                    className="justify-content-end"
                    style={{ textAlign: "end" }}
                  >
                    <p>{formatPrice(item.sub_amount)}</p>
                    <img
                      src={Delete}
                      alt="img"
                      style={{ cursor: "pointer", width: 16, height: 20 }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
            <hr />
          </Col>

          <Col md={4}>
            <hr />
            <Row>
              <Col>
                <p>Subtotal</p>
                <p>QTY</p>
              </Col>
              <Col>
                <p>{formatPrice(Total)}</p>
                <p>{transaction?.carts?.length}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p>Total</p>
              </Col>
              <Col>
                <p>{formatPrice(Total)}</p>
              </Col>
            </Row>
            <Button text={"Pay"} onClick={(e) => handleSubmit.mutate(e)} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
