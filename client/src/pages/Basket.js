import React, {useContext, useEffect, useState} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BasketItem from "../components/BasketItem";
import {check} from "../http/userApi";
import {getBasket, getBasketDevices} from "../http/basketApi";
import {fetchOneDevice} from "../http/deviceApi";

const Basket = observer(() => {
    const {user, basket} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(u => {
            console.log(u)
            getBasket(u).then(data => {
                    basket.setBasket(data)
                    getBasketDevices(data.id).then(bds =>
                    {
                        basket.setBasketDevices(bds)
                        basket.basketDevices.map(e => {
                            // console.log(e.deviceId)
                            fetchOneDevice(e.deviceId).then(d => basket.setDevices(
                                [...basket.devices, d]
                            ))
                        })
                    }
                    )
            }

        )

            user.setUser(true)
            user.setIsAuth(true)

        }).finally(() => {
            setLoading(false)
            // basket.basketDevices.map(e => console.log(e))

        })
    }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    const devicesLoad = () => {
        const devices = basket.devices.map(
            (e,i,a) => {
                if (a.length === 0) return (<div>Корзина пуста</div>)
                return (
                    <BasketItem
                        key={Date.now() + i}
                        device={e} basketDevices={basket.basketDevices}
                    >

                    </BasketItem>
                )
            }
        )
        return devices.length === 0? <div>Карзина пуста</div> : devices
    }

    // if (basket.basket.id !== undefined) {
    //     getBasketDevices(basket.basket).then(r => basket.basket.setBasketDevices(r))
    // }
    const maxHeight = window.innerHeight * 0.7

    return (
        <div>
            <div>
                <Row
                    className="p-3 m-3"
                    style={{
                        width:'auto',
                        height: 'auto',
                        maxHeight: maxHeight,
                        overflow:'scroll',
                        overflowX: 'hidden',
                        background: 'lightgray'
                    }}
                >
                    <Col md={6}
                         className="w-100"
                    >
                        {
                            devicesLoad()

                            // basket.devices.map((e,i,a) => {
                            //     if (a.length === 0) return (<div>Корзина пуста</div>)
                            //     return (
                            //         <BasketItem
                            //             key={Date.now() + i}
                            //             device={e}
                            //         >
                            //
                            //         </BasketItem>
                            //     )
                            // })


                        }

                    </Col>
                </Row>

            </div>
            <div>панель действий</div>
        </div>
    );
});

export default Basket;