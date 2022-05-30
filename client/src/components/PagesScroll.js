import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import PageScrollElement from "./PageScrollElement";
import {Context} from "../index";
const _ = require('underscore')

const PagesScroll = ({elemCountOnScreen, elemCount}) => {
    const {device} = useContext(Context)
    let pagesCount = Math.ceil(elemCount / process.env.REACT_APP_SHOPPAGE_ITEMROW_LIMIT) || 1 // console.log(pagesCount)
    let limit = Math.min(pagesCount, process.env.REACT_APP_PAGESCPOLL_PAGE_LIMIT) // console.log(pagesCount)
    let pagesIds = _.range(0, limit+2, 1)
    let locked = limit+2 === 3

    // console.log(pagesIds)
    return (
        <div className="p-3 row justify-content-center">
            {pagesIds.map(id => {
                // console.log(id)
                return (
                    <div
                        key={id}
                        className="w-auto "
                        style={{
                            paddingLeft: 2,
                            paddingRight: 2,
                        }}
                    >
                        <PageScrollElement
                            key={Date.now()}
                            id={id}
                            pagesCount={pagesCount}
                            locked={locked}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default PagesScroll;