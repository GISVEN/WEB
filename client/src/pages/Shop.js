import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import {login} from "../http/userApi";
import {render} from "react-dom";
import PagesScroll from "../components/PagesScroll";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const [elemCount, setElemCount] = useState(0)
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices({}).then(data => {
            device.setDevices(data.rows);
            setElemCount(data.count)
            // console.log(data.rows, data.count)
        });
    }, [])



    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <Button
                        className="w-100 mb-2 mt-2"
                        variant={!(device.selectedType?.name || device.selectedBrand?.name) ? "danger" : "outline-success"}
                        onClick={() => {
                            fetchDevices({
                                brandId: device.selectedBrand.id,
                                typeId: device.selectedType.id,
                                page: 1
                            }).then(data => {
                                device.setDevices(data.rows);
                                setElemCount(data.count);

                            });
                            // console.log(device.devices)
                        }}
                    >
                        {!(device.selectedType?.name || device.selectedBrand?.name) ? 'Сброс' : 'Применить'}
                    </Button>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList device={device}/> {/*selectedType={device.selectedType} selectedBrand={device.selectedBrand}**/}
                    <div>
                        <PagesScroll elemCountOnScreen={device.devices.length} elemCount={elemCount}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;