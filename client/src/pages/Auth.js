import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate, useLocation} from "react-router";
import Shop from "./Shop";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import Basket from "./Basket";
import BasketStore from "../store/BasketStore";

const Auth = observer(() => {
    const {user, basket} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const pass = () => {

    }
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            console.log('click ', data)
            user.setUser(user)
            user.setIsAuth(true)



            navigate(SHOP_ROUTE)
        } catch (e) {
            if (e.response) {
                alert(e.response.data.message)
            }
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 56}}
        >
            <Card style={{width: 600}} className={"p-5"}>
                <h2 className="m-auto">{isLogin? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="justify-content-center pt-2">

                        <Button className="w-auto"
                                variant="outline-success"
                                onClick={ click }
                        >
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>

                        {isLogin ?<div className="pt-2 text-center">
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                            :
                            <div className="pt-2 text-center">
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                    </Row>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;