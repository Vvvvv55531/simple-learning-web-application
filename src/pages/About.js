import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Tab, Nav, Row, Col, Button, Form} from 'react-bootstrap'
import './About.css'

import delivery from './img/delivery.png'
import back_abt from './img/background_2.png'
import info from './img/info.png'
import back_inf from './img/info-back.png'


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
                                            Доставка
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            <span className="link-abt">
                                            Контакты
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="third">
                                            <span className="link-abt">
                                            Поддержка
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <img 
                                        className="dev-info"
                                        src={delivery}/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        {/* <div 
                                        className="back-abt">
                                        </div> */}
                                        <img 
                                        className="info-abt"
                                        src={info}/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third">
                                        <img 
                                        className="info-abt"
                                        src={back_inf}/>

                                        <Container 
                                        className="info-abt">
                                            <h2 className="m-5">
                                            Связь с нами</h2>

                                            <Form>
                                                <Form.Group className="m-5"
                                                controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email"
                                                    placeholder="Введите адрес почты">
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group className="m-5"
                                                controlId="formBasicPassword">
                                                <Form.Label>Комментарий</Form.Label>
                                                    <Form.Control as="textarea" rows="3"
                                                    placeholder="Введите текст">
                                                    </Form.Control>
                                                </Form.Group>

                                                <Button variant="primary" type="submit"
                                                className="f-abt">
                                                Отправить</Button>
                                            </Form>
                                        </Container>
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
