import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'
import { Footer } from './Footer'

import main from './img/main.png'
import main_pic from './img/main_picture.png'
import main_pic_2 from './img/main_picture_2.png'


export default class CarouselBox extends Component {
    render() {
        return (
            <main className='main-page'>
                <Carousel>
                    <Carousel.Item>
                        <img 
                        className='w-100'
                        src={main}
                        alt='main'/>

                        <Carousel.Caption>
                            <div 
                            className='main-block'>
                                <a href='/catalog' 
                                className='main-text'> 
                                Regular Streeter - 
                                это место, где 
                                классический стиль 
                                встречается с уличной 
                                эстетикой. Здесь вы 
                                найдете универсальные 
                                и современные вещи 
                                на каждый день</a>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img 
                        className='w-100'
                        src={main_pic}
                        alt='main_picture'/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img 
                        className='w-100'
                        src={main_pic_2}
                        alt='main_picture_2'/>
                    </Carousel.Item>
                </Carousel>

                <Footer />
            </main>
        )
    }
}
