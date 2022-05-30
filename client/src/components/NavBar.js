import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, USER_PAGE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import "../AppStyles.css"
import {useNavigate} from "react-router";
import jwtDecode from "jwt-decode";




const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        // localStorage.setItem('token', '')
        navigate(SHOP_ROUTE)
    }

    const token = localStorage.getItem('token')
    const {email} = token ? jwtDecode(token) : 'email?'


    const basketClick = () => {
        if (user.isAuth) navigate(BASKET_ROUTE)
        else navigate(LOGIN_ROUTE)
    }

    let expand = 'md'
    return (
        <>
            <Navbar
                key={'md'} expand={'md'}
                className="mb-3" style={{backgroundColor: `rgb(200, 200, 200)`}}>
                <Container fluid>
                    <Navbar.Brand href={SHOP_ROUTE}>Типа крутое название *ВЖУХ*</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">

                                <Nav.Link
                                    onClick={basketClick}
                                >
                                    Карзина (WIP)
                                </Nav.Link>

                                <NavDropdown title="Личный кабинет" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                    {
                                        !user.isAuth &&
                                        <NavDropdown.Item
                                            href={LOGIN_ROUTE}
                                            className={"NavBarDropItem"}
                                            id={"LogIn"}
                                        >
                                            Войти
                                        </NavDropdown.Item>
                                    }
                                    {
                                        user.isAuth &&
                                        <NavDropdown.Item>
                                            {email ? email : 'none'}
                                        </NavDropdown.Item>

                                    }

                                    {
                                        user.isAuth &&
                                        <NavDropdown.Item
                                            onClick={logOut}
                                            className={"NavBarDropItem"}
                                            id={"LogOut"}
                                        >
                                            Выйти
                                        </NavDropdown.Item>
                                    }


                                    {
                                        user.isAuth &&
                                        <NavDropdown.Divider />
                                    }

                                    {
                                        user.isAuth &&
                                        <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>
                                            Административная панель
                                        </NavDropdown.Item>

                                    }


                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;