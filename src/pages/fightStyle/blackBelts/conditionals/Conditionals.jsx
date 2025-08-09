import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../../assets/css/style.module.css';

function Conditionals() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Conditional Forms",
      icon: "🎭",
      content: [
        {
          name: "Bassai Dai",
          videoLink: "https://vimeo.com/891288935?share=copy",
          description: "Traditional conditional form",
          difficulty: "Master",
          steps: ["Master-level conditional techniques - detailed steps to be added"]
        },
        {
          name: "Papohaku Sho",
          videoLink: "https://vimeo.com/891286068?share=copy",
          description: "Advanced conditional form",
          difficulty: "Master",
          steps: ["Master-level conditional techniques - detailed steps to be added"]
        },
        {
          name: "Beethoven",
          videoLink: "https://vimeo.com/891293935?share=copy",
          description: "Creative conditional form",
          difficulty: "Master",
          steps: ["Master-level conditional techniques - detailed steps to be added"]
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
              🎭 Conditional Forms
              <span className={css.levelBadge}>Master</span>
            </h1>
            <p className={css.levelDescription}>
              Advanced conditional forms demonstrating mastery and creativity
            </p>
          </div>
          <div className={css.progressIndicator}>
            <div className={css.progressBar}>
              <div className={css.progress} style={{width: '100%'}}></div>
            </div>
            <span className={css.progressText}>Master Level</span>
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
          <Link to="/deg2" className={css.backButton}>
            ← 2nd Degree
          </Link>
          <div className={css.levelNavigation}>
            <span className={css.currentLevel}>Conditionals</span>
            <Link to="/" className={css.nextButton}>
              Home →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Conditionals;