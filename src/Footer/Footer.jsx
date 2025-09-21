import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <section className={styles.section}>
            <div>
                <h1>Kolam Design Analyzer</h1>
                <i>by Team Name</i>
                <p>
                    Thank you for visiting Kolam Design Analyzer. Keep designing, keep analyzing, explore the world of Kolams.
                </p>
                <a href='#home' className={styles.footer_btn}>Back to Top</a>
            </div>
            <div>
                <h3>Site Map</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#upload-section">Upload</a></li>
                    <li><a href="#canvas-section">Canvas</a></li>
                    <li><a href="#learn-mode-section">Learn Mode</a></li>
                </ul>
            </div>
            <div>
                <h3>Legal</h3>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Services</a></li>
                </ul>
            </div>
            <div className='copy'>Copyright &copy; Kolam Design Analyzer, All Right Reserved.</div>
        </section>
    )
}

export default Footer;