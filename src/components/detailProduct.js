import React from 'react'
import topingJSON from '../API/Topping-List.json'
import Container from 'react-bootstrap/esm/Container'

import Topping from '../components/inputForm/Topping'
import formatPrice from '../utils/formatPrice'
import Button from '../components/inputForm/Button'


export default function detailProducts(props) {
    let dataFilter = props.data.find((item) => {
        if (item.id === Number(props.id))
            return {
                ...item,
            }
    })
    return (
        <Container className="d-flex my-5">
            <div className="col" style={{ height: "34.688rem" }}>
                <img src={dataFilter.imgUrl} alt="color-image" style={{ height: "100%" }} />
            </div>
            <div className="col-7">
                <h1 style={{ color: "#BD0707", fontWeight: 900 }}>{dataFilter.name}</h1>
                <p style={{ fontSize: 24, fontWeight: 400, color: "#974A4A", marginBottom: "4.625rem" }}>{formatPrice(dataFilter.price)}</p>
                <Topping data={topingJSON.ListToping} />
                <div className="d-flex justify-content-between" style={{ fontWeight: 900, fontSize: 24, color: "#974A4A", marginTop: "3.688rem" }} >
                    <p >Harga</p>
                    <p>{formatPrice(dataFilter.price)}</p>
                </div>
                <div style={{ marginTop: "3.688rem" }}>

                    <Button text={"Add To Cart"} />
                </div>
            </div >
        </Container >
    )
}
