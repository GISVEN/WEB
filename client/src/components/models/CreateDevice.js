import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {useEffect} from 'react'
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [type, setType] = useState({})
    const [brand, setBrand] = useState({})

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [])

    const addInfo = () => {
        setInfo([...info, {title:'', description:'', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(data => onHide())


    }

    const selectFile = e => {
        // console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            backdrop="static"
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление товара
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2" >
                        <Dropdown.Toggle>{type?.name || "Выберите тип детали"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => setType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{brand?.name || 'Выберите бренд детали'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => setBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown >
                    <Form.Control className="mt-2 mb-2"
                                  placeholder="Введите название детали"
                                  value={name}
                                  onChange={e => setName(e.target.value)}
                    />
                    <Form.Control className="mt-2 mb-2"
                                  placeholder="Введите стоимость детали"
                                  type="number"
                                  value={price}
                                  onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control className="mt-2 mb-2"
                                  type="file"
                                  // value={}
                                  onChange={selectFile}

                    />
                    <hr/>
                    <Button variant={"outline-secondary"}
                            onClick={addInfo}

                    >
                        Добавить новую характеристику
                    </Button>

                    {info.map(i =>
                        <Row className='m-3' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Введите название характеристики"
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>

                            <Col md={4}>
                                <Form.Control
                                    placeholder="Введите описание характеристики"
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>

                            <Col md={4}>
                                <Button variant="outline-danger"
                                        onClick={() => removeInfo(i.number)}

                                >
                                    Удалить характеристику
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"outline-danger"} >Отмена</Button>
                <Button variant={"outline-success"} onClick={addDevice} >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});


export default CreateDevice;