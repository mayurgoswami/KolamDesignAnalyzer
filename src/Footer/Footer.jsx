import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {  
  const { t } = useTranslation();

  const BackToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <section className={styles.section}>
      <div>
        <h1>{t('appName')}</h1>
        <i>by Team Name</i>
        <p>{t('thankYou')}</p>
        <button className={styles.footer_btn} onClick={BackToTop}>
          {t('backBtn')}
        </button>
      </div>
      <div>
        <h3>{t('siteMap')}</h3>
        <ul>
          <li><Link onClick={BackToTop} to="/">{t('home')}</Link></li>
          <li><Link onClick={BackToTop} to="/upload">{t('upload')}</Link></li>
          <li><Link onClick={BackToTop} to="/canvas">{t('canvas')}</Link></li>
          <li><Link onClick={BackToTop} to="/learn">{t('learnMode')}</Link></li>
        </ul>
      </div>
      <div>
        <h3>{t('legal')}</h3>
        <ul>
          <li><a href="#">{t('privacyPolicy')}</a></li>
          <li><a href="#">{t('termsOfService')}</a></li>
        </ul>
      </div>
      <div className='copy'>{t('Copyright')}</div>
    </section>
  );
}

export default Footer;
