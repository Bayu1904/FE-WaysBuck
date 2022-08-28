import React from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Header from "./Header";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function Income() {
  let { data: transaction } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Table bordered style={{ borderColor: "#828282" }}>
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>email</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((item, index) => (
              <tr
                // onClick={() => handleShow(item?.id)}
                key={index}
                // style={{ display: "none" }}
                className={item?.carts.length === 0 ? "fd" : ""}
              >
                <td>{index + 1}</td>
                <td>{item?.user.name}</td>
                <td>{item?.user.profile?.address}</td>
                <td>{item?.user.email}</td>
                <td>{item?.total}</td>
                <td>{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
