import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/models/CreateType";
import CreateBrand from "../components/models/CreateBrand";
import CreateDevice from "../components/models/CreateDevice";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">

            <Button
                variant="outline-secondary"
                className="m-1 w-50"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <Button
                variant="outline-secondary"
                className="m-1 w-50"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>

            <Button
                variant="outline-secondary"
                className="m-1 w-50"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить деталь
            </Button>

            <CreateType show={typeVisible} onHide={() => {setTypeVisible(false)}}/>
            <CreateBrand show={brandVisible} onHide={() => {setBrandVisible(false)}}/>
            <CreateDevice show={deviceVisible} onHide={() => {setDeviceVisible(false)}}/>
        </Container>

    );
};

export default Admin;