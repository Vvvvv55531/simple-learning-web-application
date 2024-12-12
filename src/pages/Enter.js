import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import AuthPage from './data/enterForm.js';
import './Enter.css'
import { Footer } from '../components/Footer'

import back_ent from './img/background_1.png'

export default class Enter extends Component {
    render() {
        return (
            <main className="block_enter">
                <Container>
                    <img className="back_enter"
                    src={back_ent}/>

                    <AuthPage />
                </Container>

                <Footer/>
            </main>
        )
    }
}
