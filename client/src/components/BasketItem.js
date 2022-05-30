import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Row} from "react-bootstrap";
import {DEVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {makeAutoObservable, makeObservable, observe} from "mobx";
import InputField from "./ItemField";
import {getBasketDevices, updateBasketDevice} from "../http/basketApi";

const BasketItem = observer(({device}) => {

    const {basket} = useContext(Context)
    const navigate = useNavigate()
    let [basketDevice, setBasketDevice] = useState(basket.basketDevices.find(d => d.deviceId === device.id))
    let inputValue = basketDevice.count
    // console.log(inputValue)
    //
    // // useEffect(() => {
    // //     inputValue =
    // //
    // //
    // // }, [])


    const inputStyle = {
        width: 60,
        height: 30,
        margin: 1,
        paddingLeft: 2,
        paddingRight: 2
    }


    const basketDeviceCountLimit = 999
    const onButtonClick = e => {
        if (inputValue > basketDeviceCountLimit) {
            alert(`Количество не может превышать лимита в 999!`)
            return 0
        }
        if (inputValue <= 0) {
            alert(`Количество не может быть меньше или равно нулю!`)
            return 0
        }

        // console.log(inputValue)
        updateBasketDevice(basketDevice, inputValue).then(() => {
                getBasketDevices(basket.basket.id).then(data => {
                    basket.setBasketDevices(data)
                    setBasketDevice(basket.basketDevices.find(d => d.deviceId === device.id))
                })
            }
        )
    }

    const onInputChange = e => {
        inputValue = e.target.value
        // console.log(inputValue)

    }

    return (
        <Card className="mb-1 "
            style={{

                width: `100%`

            }}

        >
            <Row className='align-items-center'>

                <h5 className="m-2"
                    style={{
                        maxWidth: '50%', cursor: 'pointer',
                    }}
                    onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
                >
                    {device?.name}
                </h5>

                <Row style={{
                    justifyContent: 'center',
                    width: 200,
                    padding: 1,
                    margin: 3
                }}>
                    <h6 className="w-auto p-1 mb-0">Количество:</h6>

                    <input
                        style={inputStyle}
                        type='number'
                        placeholder={+basketDevice.count}

                        onChange={onInputChange}
                    />
                </Row>


                <Button style={{
                    width: 100,
                    fontSize: 14,
                    padding: 2
                }}
                        variant={"success"}
                        onClick={onButtonClick}
                >
                    Применить
                </Button>

            </Row>

        </Card>
    );
});

export default BasketItem;