import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {  
  const BackToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

    return (
        <section className={styles.section}>
            <div>
                <h1>Kolam Design Analyzer</h1>
                <i>by Team Name</i>
                <p>
                    Thank you for visiting Kolam Design Analyzer. Keep designing, keep analyzing, explore the world of Kolams.
                </p>
                <button className={styles.footer_btn} onClick={BackToTop}>Back to Top</button>
            </div>
            <div>
                <h3>Site Map</h3>
                <ul>
                    <li><Link onClick={BackToTop} to="/">Home</Link></li>
                    <li><Link onClick={BackToTop} to="/upload">Upload</Link></li>
                    <li><Link onClick={BackToTop} to="/canvas">Canvas</Link></li>
                    <li><Link onClick={BackToTop} to="/learn">Learn Mode</Link></li>
                </ul>
            </div>
            <div>
                <h3>Legal</h3>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Services</a></li>
                </ul>
            </div>
            <div className='copy'>Copyright &copy; 2025, Kolam Design Analyzer, All Right Reserved.</div>
        </section>
    )
}

export default Footer;