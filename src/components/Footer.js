import './Footer.css'

export const Footer = () => {
    return <footer 
    className='footer-main bg-black py-5'>
        <div>
            <p className='footer-text'>
            <a href='/about'
            className='footer-link'>
            О нас</a></p>

            <p className='footer-text'>
            Связь с нами<br />
            regular.streeter@gmail.com<br />
            +7 (905) 223-09-06</p>
        </div>
    </footer>
}
