import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import mandala from '../assets/mandala-orange.png';

function HeroSection() {
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
                <p>Welcome to the</p>
                <h1>Kolam Design <span>Analyzer</span></h1>
                <q>Where tradition meets algorithm, and every dot becomes a story.</q>
                <button className={styles.hero_btn}>Get Started</button>
            </motion.div>
        </motion.div>
    </section>
  );
}

export default HeroSection;