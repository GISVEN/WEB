import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    key={type.id}
                    active={type.id === device.selectedType.id}
                    onClick={() => {
                        if (device.selectedType !== type) {
                            device.setSelectedType(type);
                        } else {
                            device.setSelectedType({})
                        }

                    }}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;