import React from 'react';
import styles from './Header.module.css';

import { MenuIcon, X } from 'lucide-react';

function Header() {
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
            <li className={styles.option}><a href="#home" className={styles.option_link}>Home</a></li>
            <li className={styles.option}><a href="#upload-section" className={styles.option_link}>Upload</a></li>
            <li className={styles.option}><a href="#canvas-section" className={styles.option_link}>Canvas</a></li>
            <li className={styles.option}><a href="#learn-mode-section" className={styles.option_link}>Learn Mode</a></li>
        </ul>
    </header>
  )
}

export default Header;