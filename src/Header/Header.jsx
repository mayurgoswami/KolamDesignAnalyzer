import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

function Header() {
  const {t} = useTranslation();

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
        <h1>{t('appName')}</h1>
        <ul className={styles.options_menu}>
            <li className={styles.option}><Link onClick={BackToTop} to="/" className={styles.option_link}>{t('home')}</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/upload" className={styles.option_link}>{t('upload')}</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/canvas" className={styles.option_link}>{t('canvas')}</Link></li>
            <li className={styles.option}><Link onClick={BackToTop} to="/learn" className={styles.option_link}>{t('learnMode')}</Link></li>
        <LanguageSwitcher/>
        </ul>
    </header>
  )
}

export default Header;