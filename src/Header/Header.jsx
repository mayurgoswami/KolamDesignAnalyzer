import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Header.module.css';

import { MenuIcon, X } from 'lucide-react';

function Header() {
  const BackToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  return (
    <header className={styles.header}>
      <input type="checkbox" id="menu_toggle_check" />
      <label className={styles.menu_toggle_btn} htmlFor="menu_toggle_check">
        <div className={styles.btn_line_one}></div>
        <div className={styles.btn_line_two}></div>
        <div className={styles.btn_line_three}></div>
      </label>
        <h1>Kolam Design Analyzer</h1>
        <ul className={styles.options_menu}>
            <li className={styles.option}><Link onClick={BackToTop} to="/" className={styles.option_link}>Home</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/upload" className={styles.option_link}>Upload</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/canvas" className={styles.option_link}>Canvas</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/learn" className={styles.option_link}>Learn Mode</Link></li>
        </ul>
    </header>
  )
}

export default Header;