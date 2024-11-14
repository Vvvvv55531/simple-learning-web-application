import React, { Component } from 'react';
import './Catalog.css'

import image_ctlg from './img/background_3.png'


export default class Enter extends Component {
    render() {
        return (
            <main className="block-ctlg">
                <h3 className="text-ctlg">Каталог</h3>
                <img className="back-ctlg"
                src={image_ctlg}/>

                <div className="sample"></div> {/*условное расположение элемента*/}
            </main>
        )
    }
}
