import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// components
import InputText from "../../components/inputForm/InputText";
import ButtonSubmit from "../../components/inputForm/Button";
import Header from "../../components/Header";

// reactBootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddTopping() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState("");
  const [addTopping, setAddTopping] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setAddTopping({
      ...addTopping,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(e);

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.files[0].name);
    }
  };

  console.log(addTopping);
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", addTopping.image[0], addTopping.image[0].name);
      formData.set("name", addTopping.name);
      formData.set("price", addTopping.price);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      const response = await API.post("/toping", formData, config);
      console.log(response);

      // Swal.fire({
      //   title: `Berhasil`,
      //   text: `Topping ${AddTopping.title} harga ${AddTopping.price} berhasil ditambahkan`,
      //   icon: 'success',
      //   confirmButtonText: 'OK'
      // })
      alert("berhasil menambahkan product");
      await delay(500);
      // regClose();
      navigate("/income");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header className="mb-5" />

      <Container fluid className="w-75 mt-5">
        <Row>
          <Col sm={7} className="px-5">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <h1 className="mb-5">Add Topping</h1>
              <InputText
                type="text"
                placeholder="Product Title"
                name="name"
                onChange={handleChange}
              />
              <InputText
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
              />
              <InputText type="file" name="image" onChange={handleChange} />
              <ButtonSubmit type="submit" text="AddTopping" />
            </form>
          </Col>
          <Col sm={5} className="text-center">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
