import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap'
import './Header.css'

import cart from './img/cart.png'
import menu from './img/menu.png'
import user from './img/user.png'
import icon_c from './img/icon_call.png'
import icon_t from './img/icon_telegram.png'
import icon_w from './img/icon_whatsapp.png'

import About from '../pages/About'
import Enter from '../pages/Enter'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'

const Block = () => {
    return <div className='header-block'></div>
}

const EnterPage = () => {
    return <a 
            href='/enter'>
            <Block />
            <img 
            src={user}
            alt='user'
            className='header-image'/>
        </a>
}
    
function scrollPage() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' 
    });
}

export default class Header extends Component {
    render() {
        return (
            <header>
                <Navbar collapseOnSelect fixed='top' 
                expand='md' className='header-navbar'>
                    <Container>

                        <Navbar.Toggle 
                        aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse 
                        id='responsive-navbar-nav'>

                            <Nav className='header-nav'>
                                <div className='header-group-1'> 
                                    <a href='/about'>
                                        <Block/>
                                        <img 
                                        src={menu}
                                        alt='menu'
                                        className='header-image'/>
                                    </a>
                                    
                                    <EnterPage/>

                                    <a href='/cart'>
                                        <Block />
                                        <img 
                                        src={cart}
                                        alt='cart'
                                        className='header-image'/>
                                    </a>
                                </div>

                                <div className='header-group-2'>
                                    <a href='/'
                                    className='header-link'>
                                        <h2 
                                        className='header-title'>
                                        Regular Streeter</h2>
                                    </a>
                                </div>

                                <div className='header-group-3'>
                                    <a href='/catalog'
                                    className='header-link'>
                                        <h2 
                                        className='header-text'>
                                        Catalog</h2>
                                    </a>
                                    <p onClick={scrollPage}>
                                        <img 
                                        src={icon_c}
                                        alt='icon_c'
                                        className='header-image '/>
                                    </p>
                                    <a href='https://web.telegram.org'>
                                        <img 
                                        src={icon_t}
                                        alt='icon_t'
                                        className='header-image'/>
                                    </a>
                                    <a href='https://faq.whatsapp.com'>
                                        <img 
                                        src={icon_w}
                                        alt='icon_w'
                                        className='header-image'/>
                                    </a>
                                </div>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                <BrowserRouter>
                    <Routes>
                        <Route path='/about' element={<About />} />
                        <Route path='/enter' element={<Enter />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/cart' element={<Cart />} />
                    </Routes>
                </BrowserRouter>
            </header>
        )
    }
}
