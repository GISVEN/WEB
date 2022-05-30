import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/Star.svg";
import {useParams} from "react-router";
import {fetchOneDevice} from "../http/deviceApi";
import {addDeviceInBasket, getBasket, getBasketDevices} from "../http/basketApi";
import {check} from "../http/userApi";

const DevicePage = () => {

    const [device, setDevice] = useState({info: []})
    const [basket, setBasket] = useState({info: []})

    const {id} = useParams()

    useEffect(() => {

        fetchOneDevice(id).then(data => setDevice(data))

        check().then(u => {

            getBasket(u).then(data => {
                setBasket(data)
            })

        })


    }, [])

    const addInBasket = () => {
        addDeviceInBasket(basket, device).then(() => alert(
    `Деталь ${device.name} успешно добавлена в корзину`
        )).catch(e => alert(e))
    }

    console.log(device.name)

    return (
        <Container>
            <Row className="">
                <Col md={4} className="mt-2"
                    style={{
                        maxHeight: 300
                    }}
                >
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img} border="2px solid black"
                        style={{
                            width:'100%',
                            height:'auto',
                            maxHeight:'100%',
                            maxWidth:'max-content',

                        }}
                    />
                </Col>

                <Col md={8}>
                    <Row className="d-flex">
                        <h4
                            className="w-75 mt-2"
                        >{device.name}</h4>

                        <div
                            className="d-flex align-items-center justify-content-center mt-3"
                            style={{
                                background: `url(${star}) no-repeat center center`,
                                width: 49,
                                height: 45,
                                backgroundSize: 'cover'

                            }}
                        >
                            {device.rating}
                        </div>
                        <Card className="d-flex align-items-center">
                            <h5 className="mt-2 mb-1">{`Цена: ${device.price} руб.`}</h5>
                            <Button
                                variant="outline-secondary"
                                className="w-50 mt-1 mb-2"
                                onClick={addInBasket}
                            >
                                Добавить в корзину
                            </Button>
                        </Card>

                    </Row>
                </Col>
            </Row>

            <Row className="d-flex flex-column m-4">
                <h4>Характеристики</h4>
                {device.info.map((info, index) =>
                    <Row
                        key={info.id}
                        style={{
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;