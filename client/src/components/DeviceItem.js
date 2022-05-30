import React, {useContext} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/Star.svg'
import {useNavigate} from "react-router";
import {DEVICE_ROUTE} from "../utils/consts";
import {Context} from "../index";

const DeviceItem = ({device}) => {
    const brands = useContext(Context).device.brands
    const navigate = useNavigate()
    return (
        // <Col md={3} >
        <div
            className="w-auto"
            style={{
                paddingLeft: 5,
                paddingRight: 5,
            }}
             onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card className="mt-3"
                  style={ {width: 170, height: 275, cursor: 'pointer', background: `rgba(0, 0, 0, 0.05)`} }
                  border="light"
            >
                <Image width={150}
                       height={150}
                       src={process.env.REACT_APP_API_URL + device.img}
                       className="align-self-center m-2"
                />

                <div className="d-flex justify-content-between">
                    <div className="text-black-50">
                        <h6 className="ms-2" style={{overflow:'hidden'}}>
                            {brands.map(brand => brand.id === device.brandId ? brand.name : '')}
                        </h6>
                    </div>

                    <div className="d-flex" style={{marginRight:10}}>
                        <div>{device.rating}</div>
                        <Image className="ms-1 mt-1" src={star} width={15} height={15}></Image>
                    </div>

                </div>
                <div style={{
                    paddingLeft:10,
                    paddingRight:10,
                    overflow: 'hidden',
                    fontSize: 'medium'
                }}>
                    {device.name}
                </div>
            </Card>
        </div>

        // </Col>
    );
};

export default DeviceItem;