import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap'
import "./Header.css"

import title from './img/title.png'
import menu from './img/menu.png'
import user from './img/user.png'
import icon_c from './img/icon_call.png'
import icon_t from './img/icon_telegram.png'
import icon_w from './img/icon_whatsapp.png'

import About from '../pages/About'
import Enter from '../pages/Enter'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'


export default class Header extends Component {
    render() {
        return (
            <header>
                <Navbar fixed="top" collapseOnSelect expand="md" className="nav">
                <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link href="/about">
                                    <img src={menu} height="50" width="50" />
                                </Nav.Link>

                                <Nav.Link href="/enter">
                                    <img src={user} height="50" width="50" />
                                </Nav.Link>

                                <Nav.Link href="/">
                                    <img src={title} height="35" width="284" 
                                    className="title" />
                                </Nav.Link>

                                <Nav.Link href="/catalog">
                                    <h2 className="text" >Catalog</h2>
                                </Nav.Link>

                                <Nav.Link href="#">
                                    <img src={icon_c} height="50" width="50"/>
                                </Nav.Link>

                                <Nav.Link href="https://web.telegram.org">
                                    <img src={icon_t} height="50" width="50" />
                                </Nav.Link>

                                <Nav.Link href="https://faq.whatsapp.com">
                                    <img src={icon_w} height="50" width="50" />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                <BrowserRouter>
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/enter" element={<Enter />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </BrowserRouter>
            </header>
        )
    }
}
