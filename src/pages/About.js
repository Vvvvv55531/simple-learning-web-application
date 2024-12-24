import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Tab, Nav, Row, Col, Button, Form} from 'react-bootstrap'
import './About.css'
import { Footer } from '../components/Footer'

import delivery from './img/delivery.png'
import back_abt from './img/background_3.png'
import info from './img/info.png'
import back_inf from './img/info-back.png'


const FormAbout = () => {

    const handleSubmit = async () => {
        try {
        const value = "query"; // Локальная переменная JS
    
        // Отправка значения на сервер Django через POST-запрос
        const response = await fetch("http://localhost:8000/api/get_value_2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value }),
        });

        if (response.ok) {
            console.log("Значение успешно отправлено на Django");
        } else {
            console.error("Ошибка при отправке значения на Django");
        }
        } catch (error) {
            console.error("Ошибка:", error);
    }}

    return <Form className="fff">
        <Form.Group 
        className="m-5"
        controlId="formBasicEmail">
        <Form.Label>
        Email
        </Form.Label>
            <Form.Control 
            type="email"
            as="textarea" 
            rows="2"
            placeholder="Введите адрес почты">
            </Form.Control>
        </Form.Group>

        <Form.Group 
        className="m-5"
        controlId="formBasicPassword">
        <Form.Label>
        Комментарий
        </Form.Label>
            <Form.Control 
            as="textarea" 
            rows="3"
            placeholder="Введите текст">
            </Form.Control>
        </Form.Group>

        <Button 
        variant="primary" 
        type="submit"
        className="f-abt"
        onClick={handleSubmit}>
        Отправить</Button>
    </Form>
}

export default class About extends Component {
    render() {
        return (
            <><main className="block-about">
                <Container>
                    <div className='back-left'></div>

                    <img 
                    className="back-about"
                    src={back_abt}/>

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
                                        <div 
                                        className='back-right'>
                                        </div>

                                        <img 
                                        className="dev-info"
                                        src={delivery}/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <div 
                                        className='back-right b-a'>
                                        </div>

                                        <img 
                                        className="info-abt"
                                        src={info}/>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third">
                                        <img 
                                        className="info-abt-img"
                                        src={back_inf}/>

                                        <Container className='about-form'>
                                            <h2 className="m-5">
                                            Связь с нами</h2>

                                            <FormAbout />
                                        </Container>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>   
                </Container>
                <div className="footer-abt"></div>
            </main>
            <Footer /></>
        )
    }
}
