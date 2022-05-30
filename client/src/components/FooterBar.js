import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const FooterBar = () => {
    return (
        <div
            className="mt-3"
            style={{
                position: "relative",
                left:0,
                bottom:0,
                right:0,
                background: 'darkgrey',
                width: '100%',
                height: 150

            }}
        >
            <Row className='justify-content-between'>
                <Col className="m-2" md={1}></Col>
                <Col className="m-2" md={4}>
                    <h6 className="text-center">Контактная информация:</h6>
                    <div>{`электронная почта: ${process.env.REACT_APP_CONTACT_EMAIL}`}</div>
                    <div>{`номер: ${process.env.REACT_APP_CONTACT_NUMBER}`}</div>
                </Col>
                <Col className="m-2" md={4}>
                    <h6 className="text-center">Дополнительные ссылки:</h6>
                    <div>{`дополнительная ссылка 1:`}</div>
                    <div>{`дополнительная ссылка 2:`}</div>
                </Col>
                <Col className="m-2" md={1}></Col>
            </Row>
        </div>
    );
};

export default FooterBar;