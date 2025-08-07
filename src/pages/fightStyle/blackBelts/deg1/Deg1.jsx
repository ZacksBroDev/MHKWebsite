import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../../assets/css/style.module.css';

function Deg1() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Forms",
      icon: "🥋",
      content: [
        {
          name: "Kwan Gye",
          videoLink: "https://vimeo.com/841089467",
          description: "Advanced black belt form",
          difficulty: "Advanced",
          steps: ["Advanced form techniques - detailed steps to be added"]
        },
        {
          name: "Choon Jang",
          videoLink: "https://vimeo.com/838149364?share=copy",
          description: "Traditional black belt form",
          difficulty: "Advanced",
          steps: ["Advanced form techniques - detailed steps to be added"]
        },
        {
          name: "Koryo",
          videoLink: "https://vimeo.com/840308661?share=copy",
          description: "High-level black belt form",
          difficulty: "Advanced",
          steps: ["Advanced form techniques - detailed steps to be added"]
        },
        {
          name: "Gye Beak",
          videoLink: "https://vimeo.com/838153999?share=copy",
          description: "Expert level form",
          difficulty: "Advanced",
          steps: ["Advanced form techniques - detailed steps to be added"]
        },
        {
          name: "The Beauty of Mexico",
          videoLink: "https://vimeo.com/891286260?share=copy",
          description: "Cultural demonstration form",
          difficulty: "Advanced",
          steps: ["Advanced form techniques - detailed steps to be added"]
        }
      ]
    },
    weapons: {
      title: "Weapons",
      icon: "⚔️",
      content: [
        {
          name: "Sword IV",
          videoLink: "https://vimeo.com/841070541?share=copy",
          description: "Advanced sword techniques",
          difficulty: "Advanced",
          steps: ["Advanced sword techniques - detailed steps to be added"]
        },
        {
          name: "Kama IV",
          videoLink: "https://vimeo.com/840314893?share=copy",
          description: "Advanced Kama techniques",
          difficulty: "Advanced",
          steps: ["Advanced kama techniques - detailed steps to be added"]
        },
        {
          name: "Bo IV",
          videoLink: "https://vimeo.com/840311445?share=copy",
          description: "Advanced Bo staff techniques",
          difficulty: "Advanced",
          steps: ["Advanced bo staff techniques - detailed steps to be added"]
        },
        {
          name: "Nunchaku IV",
          videoLink: "https://vimeo.com/841073460?share=copy",
          description: "Advanced Nunchaku techniques",
          difficulty: "Advanced",
          steps: ["Advanced nunchaku techniques - detailed steps to be added"]
        }
      ]
    },
    basics: {
      title: "Weapon Basics",
      icon: "⚒️",
      content: [
        {
          name: "Sword Basics",
          videoLink: "https://vimeo.com/844064289",
          description: "Fundamental sword techniques",
          difficulty: "Advanced",
          steps: ["Basic sword technique fundamentals - detailed steps to be added"]
        },
        {
          name: "Kama Basics",
          videoLink: "https://vimeo.com/844066219?share=copy",
          description: "Fundamental Kama techniques",
          difficulty: "Advanced",
          steps: ["Basic kama technique fundamentals - detailed steps to be added"]
        },
        {
          name: "Bo Basics",
          videoLink: "https://vimeo.com/840313923?share=copy",
          description: "Fundamental Bo staff techniques",
          difficulty: "Advanced",
          steps: ["Basic bo staff technique fundamentals - detailed steps to be added"]
        },
        {
          name: "Nunchaku Basics",
          videoLink: "https://vimeo.com/841073460?share=copy",
          description: "Fundamental Nunchaku techniques",
          difficulty: "Advanced",
          steps: ["Basic nunchaku technique fundamentals - detailed steps to be added"]
        }
      ]
    }
  };

  return (
    <>
      <div className={`${css.curriculum} ${css.modernLayout}`}>
        {/* Header Section */}
        <div className={css.curriculumHeader}>
          <div className={css.headerContent}>
            <h1 className={css.levelTitle}>
              🥇 1st Degree Black Belt
              <span className={css.levelBadge}>Advanced</span>
            </h1>
            <p className={css.levelDescription}>
              Master-level forms, advanced weapons training, and expert techniques
            </p>
          </div>
          <div className={css.progressIndicator}>
            <div className={css.progressBar}>
              <div className={css.progress} style={{width: '75%'}}></div>
            </div>
            <span className={css.progressText}>Advanced Level</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={css.sectionTabs}>
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              className={`${css.tab} ${activeSection === key ? css.activeTab : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <span className={css.tabIcon}>{section.icon}</span>
              <span className={css.tabText}>{section.title}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className={css.contentArea}>
          <div className={css.sectionTitle}>
            <h2>{sections[activeSection].title}</h2>
          </div>

          <div className={css.techniqueGrid}>
            {sections[activeSection].content.map((technique, index) => (
              <div key={index} className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>{technique.name}</h3>
                    <span className={`${css.difficultyBadge} ${css[technique.difficulty.toLowerCase()]}`}>
                      {technique.difficulty}
                    </span>
                  </div>
                  <div className={css.cardActions}>
                    <a 
                      href={technique.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={css.videoButton}
                    >
                      ▶️ Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(
                        expandedTechnique === `${activeSection}-${index}` 
                          ? null 
                          : `${activeSection}-${index}`
                      )}
                    >
                      {expandedTechnique === `${activeSection}-${index}` ? '▲' : '▼'}
                    </button>
                  </div>
                </div>

                <p className={css.techniqueDescription}>{technique.description}</p>

                {expandedTechnique === `${activeSection}-${index}` && (
                  <div className={css.techniqueSteps}>
                    <h4>Step-by-Step Instructions:</h4>
                    <ol className={css.stepsList}>
                      {technique.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className={css.step}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className={css.navigationFooter}>
          <Link to="/level3" className={css.backButton}>
            ← Level 3
          </Link>
          <div className={css.levelNavigation}>
            <span className={css.currentLevel}>1st Degree</span>
            <Link to="/deg2" className={css.nextButton}>
              2nd Degree →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Deg1;