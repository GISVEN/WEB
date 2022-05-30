import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from 'react'
import {createBrand, createType} from "../../http/deviceApi";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('');
            onHide()
        })
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
                    Добавление бренда
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название бренда"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant={"outline-danger"} >Отмена</Button>
                <Button variant={"outline-success"} onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;