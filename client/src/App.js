import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import FooterBar from "./components/FooterBar";

const App = observer(() => {
    const {user, basket} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then(u => {
            // getBasket(u).then(data => {
            //         basket.setBasket(data)
            //         getBasketDevices(basket.id).then(bds => basket.setBasketDevices(bds))
            //     }
            // )

            user.setUser(true)
            user.setIsAuth(true)

        }).finally(() => {
            setLoading(false)
            // basket.basketDevices.map(e => console.log(e))
        })
    }, [])

    // useEffect(() => {
    //     check().then(u => {
    //         // console.log(u)
    //         getBasket(u).then(data => basket.setBasket(data))
    //         user.setUser(true)
    //         user.setIsAuth(true)
    //     }).finally(() => {setLoading(false)})
    // }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter></AppRouter>
        {/*<FooterBar/>*/}
    </BrowserRouter>
  );
});

export default App;
