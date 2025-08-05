import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../../assets/css/style.module.css';

function Deg2() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Forms",
      icon: "🥋",
      content: [
        {
          name: "Sam II",
          videoLink: "https://vimeo.com/838146060?share=copy",
          description: "Advanced second degree form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Se Jong",
          videoLink: "https://vimeo.com/838147630?share=copy",
          description: "Traditional master form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Tong II",
          videoLink: "https://vimeo.com/838108152?share=copy",
          description: "High-level master form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Yoo Shin",
          videoLink: "https://vimeo.com/838125909?share=copy",
          description: "Expert level form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Choi Young",
          videoLink: "https://vimeo.com/838112046?share=copy",
          description: "Traditional master form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Ko Dang",
          videoLink: "https://vimeo.com/840310220?share=copy",
          description: "Advanced master form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "UlJi",
          videoLink: "https://vimeo.com/838140039?share=copy",
          description: "Expert master form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
        },
        {
          name: "Twilight Zone",
          videoLink: "https://vimeo.com/891285855?share=copy",
          description: "Creative demonstration form",
          difficulty: "Expert",
          steps: ["Master-level form techniques - detailed steps to be added"]
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
              🥇 2nd Degree Black Belt
              <span className={css.levelBadge}>Expert</span>
            </h1>
            <p className={css.levelDescription}>
              Master-level forms and expert techniques for advanced practitioners
            </p>
          </div>
          <div className={css.progressIndicator}>
            <div className={css.progressBar}>
              <div className={css.progress} style={{width: '90%'}}></div>
            </div>
            <span className={css.progressText}>Expert Level</span>
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
          <Link to="/deg1" className={css.backButton}>
            ← 1st Degree
          </Link>
          <div className={css.levelNavigation}>
            <span className={css.currentLevel}>2nd Degree</span>
            <Link to="/conditionals" className={css.nextButton}>
              Conditionals →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Deg2;