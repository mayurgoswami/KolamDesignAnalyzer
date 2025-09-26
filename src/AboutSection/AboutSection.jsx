import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AboutSection.module.css';
import { Link } from 'react-router-dom';
import kolamImage from '../assets/about-mandala.png';
import { useTranslation } from 'react-i18next';

const kolamSVG = (
  <svg className={styles.kolamSVG} viewBox="0 0 120 120" width="160" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="55" stroke="var(--app-primary)" strokeWidth="3" />
    <g stroke="var(--app-primary)" strokeWidth="2">
      <path d="M60 15 Q80 60 60 105 Q40 60 60 15 Z" />
      <path d="M15 60 Q60 80 105 60 Q60 40 15 60 Z" />
      <circle cx="60" cy="60" r="30" />
    </g>
    <circle cx="60" cy="60" r="5" fill="var(--app-primary)" />
  </svg>
);


const AboutSection = () => {
  const [showFact, setShowFact] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const { t } = useTranslation();

  const funFacts = [
    t('fact1'),
    t('fact2'),
    t('fact3'),
    t('fact4') 
  ];

  const handleShowFact = () => {
    const newIdx = Math.floor(Math.random() * funFacts.length);
    setFactIdx(newIdx);
    setShowFact(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const svgVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1.5
      }
    }
  };

  const factVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const BackToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <img src={kolamImage} className={styles.about_kolam}/>

        <motion.div 
          className={styles.textCol}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className={styles.heading} variants={itemVariants}>
            {t('aboutKolam')}
          </motion.h2>
          
          <motion.p className={styles.description} variants={itemVariants}>
            <strong>{t('kolam')}</strong> {t('aboutParaOne')}
          </motion.p>
          
          <motion.p className={styles.description} variants={itemVariants}>
            {t('aboutParaTwo')}
          </motion.p>

          <motion.div className={styles.interactiveRow} variants={itemVariants}>
            <motion.button 
              className={styles.factBtn} 
              onClick={handleShowFact}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 8px 20px var(--app-primary-transparent)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {showFact ? t('factBtnNext') : t('factBtn')}
            </motion.button>
            
            <AnimatePresence mode="wait">
              {showFact && (
                <motion.div
                  className={styles.funFact}
                  variants={factVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={factIdx}
                >
                  <span role="img" aria-label="sparkles"></span> {funFacts[factIdx]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            className={styles.ctaBtn}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 8px 25px var(--app-primary-transparent)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to='/canvas' onClick={BackToTop}>{t('drawingBtn')}</Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.bgDot1}></div>
        <div className={styles.bgDot2}></div>
        <div className={styles.bgDot3}></div>
      </div>
    </section>
  );
};

export default AboutSection;