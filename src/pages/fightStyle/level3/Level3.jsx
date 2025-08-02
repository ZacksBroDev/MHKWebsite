// Level 3 Fighting Styles - Enhanced UX/UI for advanced martial arts learning
import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../assets/css/style.module.css';

function Level3() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Advanced Forms",
      icon: "🥋",
      content: [
        {
          name: "Chung Mu",
          videoLink: "https://vimeo.com/853564229?share=copy",
          description: "Named after the great Admiral Yi Sun-Sin",
          difficulty: "Advanced",
          steps: [
            "Ready stance",
            "Complex movements with twin fist techniques",
            "Advanced stepping patterns",
            "Multiple direction changes",
            "Coordinated hand and foot techniques"
          ]
        },
        {
          name: "Po Eun",
          videoLink: "https://vimeo.com/853563473?share=copy",
          description: "Named after the noted scholar Po Eun",
          difficulty: "Advanced",
          steps: [
            "Ready stance",
            "Scholar's movement patterns",
            "Precise technique execution",
            "Traditional form structure",
            "Advanced coordination requirements"
          ]
        },
        {
          name: "Might For Right",
          videoLink: "https://vimeo.com/862546959?share=copy",
          description: "Philosophy-based form emphasizing justice",
          difficulty: "Advanced",
          steps: [
            "Ready stance",
            "Power-based techniques",
            "Justice-themed movements",
            "Strong defensive positions",
            "Finishing combinations"
          ]
        }
      ]
    },
    weapons: {
      title: "Advanced Weapons",
      icon: "⚔️",
      content: [
        {
          name: "Bo Staff (Bo 3)",
          videoLink: "https://vimeo.com/853565688?share=copy",
          description: "Advanced staff form with complex patterns",
          difficulty: "Advanced",
          steps: [
            "Advanced spinning combinations",
            "Complex footwork integration",
            "Multiple striking angles",
            "Defensive and offensive patterns",
            "Form completion techniques"
          ]
        }
      ]
    },
    combinations: {
      title: "Advanced Combinations",
      icon: "🥊",
      content: [
        {
          name: "Kickboxing Combination Set",
          videoLink: "https://vimeo.com/892779060",
          description: "Traditional kickboxing combinations 1-4",
          difficulty: "Advanced",
          steps: [
            "1. Reverse hook kick/round kick, back punch, Back leg round kick/side kick, back punch",
            "2. Inside-outside kick, Lunge punch, Reverse hook kick/round kick/side kick, back punch",
            "3. Front punch, Hook kick/round kick, Reverse side kick, Reverse back fist, back punch",
            "4. 360° Round kick, Reverse hook kick, Back leg round kick, Back ridge hand"
          ]
        },
        {
          name: "American Kickboxing Set (1-5)",
          videoLink: "https://vimeo.com/853567562?share=copy",
          description: "Offensive American kickboxing combinations",
          difficulty: "Advanced",
          steps: [
            "1. Jab/hook",
            "2. Uppercut, Hook",
            "3. Jab, Cross, Hook",
            "4. Jab/Hook, spin back fist (all the way through resetting with back leg)",
            "5. Thrust front kick, Uppercut, Hook"
          ]
        },
        {
          name: "American Kickboxing Set (6-9)",
          videoLink: "https://vimeo.com/853568289?share=copy",
          description: "Advanced American kickboxing combinations",
          difficulty: "Advanced",
          steps: [
            "6. Jab, Cross, Front Round Kick (no hip extension), Back Round Kick (no hip extension)",
            "7. Jab, Front kick, Cross, Front round kick (no hip extension)",
            "8. Hook, Cross, Back round kick (no hip extension)",
            "9. Jab, Bump Front leg ax kick, Full back leg round kick (Spin though to turn)"
          ]
        },
        {
          name: "American Kickboxing Set (10+)",
          videoLink: "https://vimeo.com/853568682?share=copy",
          description: "Expert level American kickboxing combinations",
          difficulty: "Expert",
          steps: [
            "10. Jab, Cross, Back leg outside to inside crescent kick, Ridge hand",
            "11. Back leg round kick, Tornado kick, Reverse Hook kick",
            "12. Jump back leg front kick/ Back leg Round Kick, Reverse Hook Kick, Back fist, Cross",
            "13. Jump back leg round kick/ back round kick, Reverse Hook Kick"
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
            <span className={css.levelBadge}>Level 3</span>
            Advanced Techniques
          </h1>
          <p className={css.levelDescription}>
            Master advanced forms, complex weapon techniques, and sophisticated kickboxing combinations
          </p>
        </div>
        <div className={css.progressIndicator}>
          <div className={css.progressBar}>
            <div className={css.progress} style={{width: '90%'}}></div>
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
                    ▶️ Watch Video
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
        <Link to="/level2" className={css.backButton}>
          ← Previous Level
        </Link>
        <div className={css.levelNavigation}>
          <span className={css.currentLevel}>Level 3</span>
          <Link to="/blackBelts" className={css.nextButton}>
            Black Belts →
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Level3;