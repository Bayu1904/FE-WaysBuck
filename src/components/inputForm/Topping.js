import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Topping(props) {
    return (
        <section className="container px-0">
            <h5 style={{ color: "#974A4A", fontWeight: 800, marginBottom: 22 }}>Topping</h5>
            <div className={`d-flex row`} style={{ width: "400" }}>
                {props.data.map((item, id) => {
                    return (
                        <div className="col-3 text-center">
                            <div key={id}>
                                <img src={item.imageUrl} style={{
                                    width: 80, height: 80
                                }} alt="toping" />
                                <p style={{ fontSize: 14, fontWeight: 400, color: "#BD0707" }}> {item.name}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </section >
    )
}
