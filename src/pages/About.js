import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Tab, Nav, Row, Col, Button } from 'react-bootstrap'
import './About.css'

import delivery from './img/delivery.png'
import back_abt from './img/background_2.png'


export default class About extends Component {
    render() {
        return (
            <main className="block-about">
                <Container>
                    <img 
                    className="back-about"
                    src={back_abt}/>

                    <Button 
                    className="button-abt" href="/catalog">
                    <span className="text-button">
                    Перейти к товарам
                    </span>
                    </Button>
                    <Tab.Container id="tab" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" 
                                className="flex-column nav-about">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">
                                            <span className="link-abt">
                                            Delivery
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            <span className="link-abt">
                                            Contacts
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="third">
                                            <span className="link-abt">
                                            Support
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <img 
                                        className='dev-info'
                                        src={delivery}/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <div 
                                        className="back-abt">
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third">
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>    
                </Container>
            </main>
        )
    }
}
