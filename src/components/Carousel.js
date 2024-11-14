import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'

import main from './img/main.png'
import main_pic from './img/main_picture.png'


export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img className="w-100"
                    src={main}/>

                    <Carousel.Caption>
                        <div className='block'>
                            <p>
                                Regular Streeter - это место, где классический стиль встречается 
                                с уличной эстетикой. 
                                Здесь вы найдете универсальные и современные вещи на каждый день
                            </p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img className="w-100"
                    src={main_pic}/>
                </Carousel.Item>
            </Carousel>
        )
    }
}
