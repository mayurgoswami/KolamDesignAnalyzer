import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import mandala from '../assets/mandala-orange.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();

  // Animation variants for framer-motion
  const outerMandalaVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const innerMandalaVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const welcomeBoxVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.section} id='home'>
      <div className={styles.outer_mandala_container}>
        <motion.img
          src={mandala}
          className={styles.mandala_out}
          variants={outerMandalaVariants}
          animate="animate"
        />
      </div>

      <motion.div
        className={styles.welcome_box}
        variants={welcomeBoxVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={mandala}
          className={styles.mandala_in}
          variants={innerMandalaVariants}
          animate="animate"
        />

        <motion.div
          className={styles.content_box}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <p>{t('welcome')}</p>
          <h1>{t('appName')}</h1>
          <q>{t('quote')}</q>
          <div className={styles.content_box_btn}>
            <div className={styles.hero_btn}>
              <Link to='/upload'>{t('stated')}</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
