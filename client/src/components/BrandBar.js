import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import DeviceList from "./DeviceList";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex ">
            {device.brands.map(brand =>
                <Card
                    style={{cursor: 'pointer'}}
                    key={brand.id}
                    className="p-2 ms-2 w-auto"
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}

                    onClick={() => {
                        if (device.selectedBrand !== brand) {
                            device.setSelectedBrand(brand);
                        } else {
                            device.setSelectedBrand({})
                        }

                    }}

                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;