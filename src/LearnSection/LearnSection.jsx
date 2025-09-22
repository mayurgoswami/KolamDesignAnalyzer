import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, SkipForward, RotateCcw, CheckCircle, Lock } from 'lucide-react';
import styles from './LearnSection.module.css';

const LearnModeSection = () => {
  const [activeCategory, setActiveCategory] = useState('beginner');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const categories = [
    { id: 'beginner', name: 'Beginner', color: '#8FA998' },
    { id: 'intermediate', name: 'Intermediate', color: '#E1B530' },
    { id: 'advanced', name: 'Advanced', color: '#BA3111' },
    { id: 'traditional', name: 'Traditional', color: '#6D6A6A' }
  ];

  const lessons = {
    beginner: [
      {
        id: 1,
        title: 'Basic Dot Patterns',
        description: 'Learn fundamental dot arrangements that form the foundation of Kolam',
        duration: '5 min',
        steps: 4,
        completed: true,
        preview: 'M30,30 L50,50 L70,30 L50,10 Z'
      },
      {
        id: 2,
        title: 'Simple Line Connections',
        description: 'Connect dots with basic curved lines and patterns',
        duration: '8 min',
        steps: 6,
        completed: false,
        preview: 'M20,40 Q40,20 60,40 T100,40'
      },
      {
        id: 3,
        title: 'Circular Foundations',
        description: 'Create beautiful circular patterns from center points',
        duration: '10 min',
        steps: 5,
        completed: false,
        preview: 'M50,20 A30,30 0 1,1 50,80 A30,30 0 1,1 50,20'
      }
    ],
    intermediate: [
      {
        id: 4,
        title: 'Symmetrical Designs',
        description: 'Master vertical and horizontal symmetry in Kolam',
        duration: '12 min',
        steps: 7,
        completed: false,
        preview: 'M30,30 L50,10 L70,30 L50,50 Z M30,70 L50,90 L70,70 L50,50 Z'
      },
      {
        id: 5,
        title: 'Floral Patterns',
        description: 'Create flower-inspired Kolam designs',
        duration: '15 min',
        steps: 8,
        completed: false,
        preview: 'M50,20 A10,10 0 1,1 50,40 A10,10 0 1,1 50,20 M50,60 A10,10 0 1,1 50,80 A10,10 0 1,1 50,60'
      }
    ],
    advanced: [
      {
        id: 6,
        title: 'Complex Geometrics',
        description: 'Advanced mathematical patterns and sequences',
        duration: '20 min',
        steps: 10,
        completed: false,
        preview: 'M20,20 L40,40 L60,20 L80,40 L60,60 L40,40 L20,60 Z'
      }
    ],
    traditional: [
      {
        id: 7,
        title: 'Festival Specials',
        description: 'Traditional patterns for special occasions',
        duration: '18 min',
        steps: 9,
        completed: false,
        preview: 'M30,30 L50,10 L70,30 L50,50 Z M30,70 L50,90 L70,70 L50,50 Z'
      }
    ]
  };

  const lessonSteps = selectedLesson ? [
    {
      title: 'Dot Placement',
      description: 'Start by placing the foundation dots in a precise grid pattern',
      pattern: 'M20,20 L80,20 L80,80 L20,80 Z',
      duration: 2
    },
    {
      title: 'Initial Connections',
      description: 'Connect the outer dots to create the basic framework',
      pattern: 'M20,20 L80,20 M80,20 L80,80 M80,80 L20,80 M20,80 L20,20',
      duration: 3
    },
    {
      title: 'Curved Lines',
      description: 'Add flowing curves between the connected points',
      pattern: 'M30,30 Q50,10 70,30 T90,50',
      duration: 4
    },
    {
      title: 'Final Touches',
      description: 'Complete the pattern with intricate details and flourishes',
      pattern: 'M40,40 L60,40 L60,60 L40,60 Z',
      duration: 3
    }
  ] : [];

  const startLesson = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / lessonSteps.length) * 100);
    } else {
      // Lesson completed
      setIsPlaying(false);
      setProgress(100);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const closeLesson = () => {
    setSelectedLesson(null);
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const lessonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className={styles.learnModeSection} id="learn">
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Learn Kolam Art</h2>
          <p className={styles.subtitle}>
            Master the ancient art of Kolam through interactive lessons and step-by-step tutorials
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className={styles.categoryTabs}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{
                '--category-color': category.color
              }}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          className={styles.lessonsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {lessons[activeCategory].map((lesson) => (
            <motion.div
              key={lesson.id}
              className={`${styles.lessonCard} ${lesson.completed ? styles.completed : ''}`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
            >
              <div className={styles.lessonPreview}>
                <svg viewBox="0 0 100 100" className={styles.previewSVG}>
                  <path d={lesson.preview} fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {lesson.completed && (
                  <div className={styles.completedBadge}>
                    <CheckCircle size={20} />
                  </div>
                )}
              </div>
              
              <div className={styles.lessonContent}>
                <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                <p className={styles.lessonDescription}>{lesson.description}</p>
                
                <div className={styles.lessonMeta}>
                  <span className={styles.duration}>{lesson.duration}</span>
                  <span className={styles.steps}>{lesson.steps} steps</span>
                </div>
                
                <button 
                  className={styles.startButton}
                  onClick={() => startLesson(lesson)}
                >
                  {lesson.completed ? 'Review Lesson' : 'Start Learning'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lesson Modal */}
        <AnimatePresence>
          {selectedLesson && (
            <motion.div
              className={styles.lessonModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.modalContent}
                variants={lessonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Modal Header */}
                <div className={styles.modalHeader}>
                  <div>
                    <h3 className={styles.modalTitle}>{selectedLesson.title}</h3>
                    <p className={styles.modalSubtitle}>Step {currentStep + 1} of {lessonSteps.length}</p>
                  </div>
                  <button className={styles.closeButton} onClick={closeLesson}>
                    ×
                  </button>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <motion.div 
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className={styles.progressText}>{Math.round(progress)}% Complete</span>
                </div>

                {/* Step Content */}
                <div className={styles.stepContent}>
                  <div className={styles.patternDisplay}>
                    <svg viewBox="0 0 100 100" className={styles.patternSVG}>
                      <motion.path
                        d={lessonSteps[currentStep]?.pattern}
                        fill="none"
                        stroke="var(--app-primary)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                  
                  <div className={styles.stepInfo}>
                    <h4 className={styles.stepTitle}>{lessonSteps[currentStep]?.title}</h4>
                    <p className={styles.stepDescription}>{lessonSteps[currentStep]?.description}</p>
                    
                    <div className={styles.controls}>
                      <button 
                        className={styles.controlButton}
                        onClick={resetLesson}
                        disabled={currentStep === 0}
                      >
                        <RotateCcw size={18} />
                        Reset
                      </button>
                      
                      <button 
                        className={`${styles.controlButton} ${styles.playButton}`}
                        onClick={togglePlay}
                      >
                        {isPlaying ? <Square size={18} /> : <Play size={18} />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      
                      <button 
                        className={styles.controlButton}
                        onClick={nextStep}
                        disabled={currentStep === lessonSteps.length - 1}
                      >
                        <SkipForward size={18} />
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step Indicators */}
                <div className={styles.stepIndicators}>
                  {lessonSteps.map((step, index) => (
                    <button
                      key={index}
                      className={`${styles.stepIndicator} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                      onClick={() => {
                        setCurrentStep(index);
                        setProgress((index / lessonSteps.length) * 100);
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className={styles.ctaTitle}>Ready to Create Your Masterpiece?</h3>
          <p className={styles.ctaText}>
            Practice what you've learned and design your own beautiful Kolam patterns
          </p>
          <div className={styles.ctaButtons}>
            <a href="#canvas" className={styles.ctaButtonPrimary}>
              Start Creating
            </a>
            <a href="#gallery" className={styles.ctaButtonSecondary}>
              View Gallery
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnModeSection;