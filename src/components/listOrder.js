import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img1 from '../assets/Rectangle 4boba-1.png'
import Delete from '../assets/bin 1.png'

export default function listOrder() {
    return (
        <>
            <Container className="justify-content-between " >
                <Row style={{ fontSize: 14, color: "#BD0707", minHeight: 400 }}>
                    <Col md={8} className="d-flex">
                        <div className="rounded" style={{ width: 80, height: 80, marginRight: 13 }}>
                            <img src={img1} alt="img" style={{ width: "100%" }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 900 }}>Ice Coffe Palm Sugar</p>
                            <p style={{ fontSize: 14 }}><span style={{ color: "#974A4A", fontWeight: 800 }}>Toping </span>: Bill Berry Boba, Bubble Tea Gelatin</p>
                        </div>
                    </Col>
                    <Col md={4} className="justify-content-end" style={{ textAlign: "end" }}>
                        <p>Rp.33.000</p>
                        <img src={Delete} alt="img" style={{ width: 16, height: 20 }} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
