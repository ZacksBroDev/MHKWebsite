// Level 2 Fighting Styles - Enhanced UX/UI for intermediate martial arts learning
import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../assets/css/style.module.css';

function Level2() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Advanced Forms",
      icon: "🥋",
      content: [
        {
          name: "Dan-Gun Hyung",
          videoLink: "https://vimeo.com/838952166?share=copy",
          description: "Intermediate form building on foundation techniques",
          difficulty: "Intermediate",
          steps: [
            "Ready stance",
            "1. Step left foot to the left (west) front stance, left high block",
            "2. Left fist aim, right foot step forward into right front stance, front punch (right hand)",
            "3. Swing right foot into right front stance east, right high block",
            "4. Right fist aim, left foot step forward into left front stance east, front punch (left hand)",
            "5. Shift into left front stance north, left high block",
            "6. Left fist aim, right foot step forward into right front stance, front punch (right hand)",
            "7. Swing right foot into right front stance south, right high block",
            "8. Right fist aim, left foot step forward into left front stance south, front punch (left hand). Yell"
          ]
        },
        {
          name: "Do-San Hyung",
          videoLink: "https://vimeo.com/838952166?share=copy",
          description: "Named after the patriot Ahn Do-San",
          difficulty: "Intermediate",
          steps: [
            "Ready stance",
            "Complex pattern with twin fist blocks",
            "Stepping and turning techniques",
            "Combination blocks and strikes",
            "Advanced footwork patterns"
          ]
        }
      ]
    },
    weapons: {
      title: "Advanced Weapons",
      icon: "⚔️",
      content: [
        {
          name: "Bo Staff (Bo 2)",
          videoLink: "#",
          description: "Intermediate staff techniques and combinations",
          difficulty: "Intermediate",
          steps: [
            "Advanced spinning techniques",
            "Combination striking patterns",
            "Defensive blocks and counters",
            "Footwork integration",
            "Form applications"
          ]
        },
        {
          name: "Kama Forms",
          videoLink: "https://vimeo.com/844692127?share=copy",
          description: "Traditional sickle weapon techniques",
          difficulty: "Intermediate",
          steps: [
            "Ready stance (feet shoulder width, Kamas crossed)",
            "Basic cutting techniques",
            "Blocking and parrying",
            "Combination sequences",
            "Safety protocols"
          ]
        }
      ]
    },
    combinations: {
      title: "Advanced Combinations",
      icon: "🥊",
      content: [
        {
          name: "Intermediate Sparring Sets",
          videoLink: "#",
          description: "Complex attack and defense combinations",
          difficulty: "Intermediate",
          steps: [
            "Multi-technique combinations",
            "Counter-attack sequences",
            "Advanced footwork patterns",
            "Timing and distance control",
            "Defensive strategies"
          ]
        }
      ]
    }
  };

  return (
    <div className={`${css.curriculum} ${css.modernLayout}`}>
      {/* Header Section */}
      <div className={css.curriculumHeader}>
        <div className={css.headerContent}>
          <h1 className={css.levelTitle}>
            <span className={css.levelBadge}>Level 2</span>
            Intermediate Techniques
          </h1>
          <p className={css.levelDescription}>
            Build upon your foundation with more complex forms, advanced weapons training, and intermediate combinations
          </p>
        </div>
        <div className={css.progressIndicator}>
          <div className={css.progressBar}>
            <div className={css.progress} style={{width: '66%'}}></div>
          </div>
          <span className={css.progressText}>Intermediate Level</span>
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
                  {technique.videoLink !== "#" && (
                    <a 
                      href={technique.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={css.videoButton}
                    >
                      ▶️ Watch Video
                    </a>
                  )}
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
        <Link to="/level1" className={css.backButton}>
          ← Previous Level
        </Link>
        <div className={css.levelNavigation}>
          <span className={css.currentLevel}>Level 2</span>
          <Link to="/level3" className={css.nextButton}>
            Next Level →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Level2;
