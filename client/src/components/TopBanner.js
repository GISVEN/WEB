import React from 'react';
import {blur} from "@testing-library/user-event/dist/blur";

const TopBanner = () => {
    let back = "https://3dnews.ru/assets/external/illustrations/2019/08/18/992598/drako1.jpg"
    return (
        <div style={{
            backgroundImage: `url(${back})`,
            backgroundColor: "transparent",
            backgroundFilter: `blur(3px)`
        }}>
            <img src={"https://img2.freepng.ru/20180423/fee/kisspng-gear-computer-icons-clip-art-gears-vector-5ade0a7c6d8aa1.0918008615245011164487.jpg"}/>
        </div>
    );
};

export default TopBanner;