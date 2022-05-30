import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {fetchDevices} from "../http/deviceApi";
import {Context} from "../index";
import {getElement} from "bootstrap/js/src/util";

const PageScrollElement = ({id, pagesCount, locked}) => {
    const {device} = useContext(Context)

    const [onClick, setOnClick] = useState(null)
    const [buttonText, setButtonText] = useState('')

    if (id === 0) return (
        <Button key={id}
                value={id}
                disabled={locked}
                onClick={() => {
                    if (device.currentPage - 1 !== id) {
                        fetchDevices({
                            typeId: device.selectedType.id,
                            brandId: device.selectedBrand.id,
                            page: device.currentPage - 1
                        }).then(data => device.setDevices(data.rows))
                        device.setCurrentPage(device.currentPage-1)
                    }
                }}
        >
            {`<`}
        </Button>
    )

    if (id <= pagesCount) return (
        <Button key={id} disabled={locked}
            onClick={() => {
                fetchDevices({
                    typeId: device.selectedType.id,
                    brandId: device.selectedBrand.id,
                    page: id
                }).then(data => device.setDevices(data.rows))
                device.setCurrentPage(id)
            }}
        >
            {id}
        </Button>
    );

    if (id === pagesCount+1) return (
        <Button key={id}
                disabled={locked}
                onClick={() => {
                    if (device.currentPage + 1 !== id) {
                        fetchDevices({
                            typeId: device.selectedType.id,
                            brandId: device.selectedBrand.id,
                            page: device.currentPage + 1
                        }).then(data => device.setDevices(data.rows))
                    }
                    device.setCurrentPage(device.currentPage+1)
                }}
        >
            {'>'}
        </Button>
    );
};

export default PageScrollElement;