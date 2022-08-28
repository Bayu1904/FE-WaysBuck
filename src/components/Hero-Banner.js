import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import HeroImage from '../assets/Jumbotron.png'
function HeroBanner() {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src={HeroImage} className="w-100 mt-5" alt="Hero Image" />
                </Col>
            </Row>
        </Container>
    );
}

export default HeroBanner;