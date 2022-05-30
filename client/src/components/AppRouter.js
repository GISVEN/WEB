import React, {useContext} from 'react';
import {Routes, Route, Navigate, Redirect} from "react-router";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Shop from "../pages/Shop";


const AppRouter = () => {
    const {user} = useContext(Context)
    // console.log(user)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={ <Navigate to={SHOP_ROUTE} /> } />
        </Routes>
    );
};

export default AppRouter;