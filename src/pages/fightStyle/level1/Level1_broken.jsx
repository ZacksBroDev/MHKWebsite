/**
 * Level1 Component
 * 
 * Displays Level 1 martial arts curriculum including forms, weapons, and combinations.
 * Contains educational content with video links for each technique and form.
 * Part of the curriculum navigation system for students.
 * 
 * @component
 * @returns {JSX.Element} Level 1 curriculum page
 * 
 * Content Includes:
 * - Chon Ji Hyung form with video instruction
 * - Bo staff techniques (Bo 1)
 * - Combination sets for sparring practice
 * - Navigation back to home page
 * - Structured learning progression
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../assets/css/style.module.css';

/**
 * Level1 Component - Level 1 curriculum display
 * @returns {JSX.Element} Level 1 curriculum page with forms and techniques
 */
function Level1() {
  const [activeSection, setActiveSection] = useState('forms');
  const [expandedTechnique, setExpandedTechnique] = useState(null);

  const sections = {
    forms: {
      title: "Forms",
      icon: "🥋"
    },
    combos: {
      title: "Combos",
      icon: "🥊"
    }
  };

  return (
    <div className={`${css.curriculum} ${css.modernLayout}`}>
      {/* Header Section */}
      <div className={css.curriculumHeader}>
        <div className={css.headerContent}>
          <h1 className={css.levelTitle}>
            <span className={css.levelBadge}>Level 1</span>
            🥋 Level 1
          </h1>
          <p className={css.levelDescription}>
            Master the fundamental forms and essential combinations
          </p>
        </div>
        <div className={css.progressIndicator}>
          <div className={css.progressBar}>
            <div className={css.progress} style={{width: '30%'}}></div>
          </div>
          <span className={css.progressText}>Beginner Level</span>
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
        {activeSection === 'forms' && (
          <>
            <div className={css.sectionTitle}>
              <h2>🥋 Forms</h2>
            </div>

            <div className={css.techniqueGrid}>
              {/* Chon Ji Hyung */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Chon Ji Hyung</h3>
                    <span className={`${css.difficultyBadge} ${css.beginner}`}>Beginner</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/838866958?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'chonji' ? null : 'chonji')}
                    >
                      {expandedTechnique === 'chonji' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready stance</p>
                
                {expandedTechnique === 'chonji' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Step left foot to the left (west) front stance down block, Yell</li>
                      <li className={css.step}>2. Left fist aim, right foot step forward into right front stance, front punch (right hand)</li>
                      <li className={css.step}>3. Swing right foot into right front stance east, right down block</li>
                      <li className={css.step}>4. Right fist aim, left foot, step forward into left front stance east, front punch (left hand)</li>
                      <li className={css.step}>5. Shift into left front stand north, left down block</li>
                      <li className={css.step}>6. Left fist aim, right foot, step forward into Right front stance, front punch (right hand)</li>
                      <li className={css.step}>7. Swing right foot into right front stance South, right down block</li>
                      <li className={css.step}>8. Right fist aim, left foot, step forward into left front stance east, front punch (left hand). Yell</li>
                      <li className={css.step}>9. Swinging left foot left, shift into right back stance east, left side block.</li>
                      <li className={css.step}>10. Left fist aim, right foot step forward into Right front stance, front punch (right hand)</li>
                      <li className={css.step}>11. Swing right foot into left back stance west, right side block</li>
                      <li className={css.step}>12. Right fist aim, left foot step forward into Left front stance, front punch (left hand)</li>
                      <li className={css.step}>13. Swing left foot into right back stance South, left side block</li>
                      <li className={css.step}>14. Left fist aim, Right foot step forward into right front stance, front punch (right hand)</li>
                      <li className={css.step}>15. Swing right foot into left back stance North, right side block</li>
                      <li className={css.step}>16. Right fist aim, left foot step forward into Left front stance, front punch (left hand)</li>
                      <li className={css.step}>17. Right foot step into right front stance, right front punch</li>
                      <li className={css.step}>18. Right step back into left front stance, left front punch.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Kama 1 */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Kama 1</h3>
                    <span className={`${css.difficultyBadge} ${css.beginner}`}>Beginner</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844692127?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'kama1' ? null : 'kama1')}
                    >
                      {expandedTechnique === 'kama1' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready stance (feet shoulder width. Kamas crossed at waist level, right hand on top)</p>
                
                {expandedTechnique === 'kama1' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Step left (90*) into left front stance left. Left down block. Right high block. Yell</li>
                      <li className={css.step}>2. Step forward (right foot forward) into right front stance west. Right chop at chest level, left high block.</li>
                      <li className={css.step}>3. Pivot right on left foot into right front stance east. Right down block. Left high block.</li>
                      <li className={css.step}>4. Step forward (left foot forward) into left front stance east. Left chop at chest level, right high block.</li>
                      <li className={css.step}>5. Shift (moving left foot left) into front stance north. Left down block. Right high block.</li>
                      <li className={css.step}>6. Step left foot forward into left front stance north. Right chop chest level. Left high block.</li>
                      <li className={css.step}>7. Pivot to the right on left foot into right front stance south. Right down block. Left high block.</li>
                      <li className={css.step}>8. Step forward (left foot forward) into left front stance south. Left chop at chest level, right high block. Yell</li>
                      <li className={css.step}>9. Shift (left foot to the left) into right back stance east. Square block. Right hand on top</li>
                      <li className={css.step}>10. Step right foot forward into right front stance east. Right chop at chest level left high block</li>
                      <li className={css.step}>11. Pivot right on left foot into left back stance west. Square block. Left hand on top</li>
                      <li className={css.step}>12. Step forward (left foot forward) into left front stance west. Left chop at chest level, right high block.</li>
                      <li className={css.step}>13. Shift (left foot to the left) into right back stance south. Square block. Right hand on top</li>
                      <li className={css.step}>14. Step right foot forward into right front stance south. Right chop at chest level left high block</li>
                      <li className={css.step}>15. Pivot right on left foot into left back stance north. Square block. Left hand on top</li>
                      <li className={css.step}>16. Step forward (left foot forward) into left front stance north. Left chop at chest level, right high block.</li>
                      <li className={css.step}>17. Step forward (right foot forward) into right front stance north. Right chop at chest level, left high block</li>
                      <li className={css.step}>18. Step back (right foot backward) into left front stance north. Left chop at chest level, right high block.</li>
                      <li className={css.step}>19. Left step back into right front stance, right front punch. Yell</li>
                    </ol>
                  </div>
                )}
              </div>
            "9. Turn to face east into right front stance, down block",
            "10. Step forward into left front stance, front punch",
            "11. Turn to face south into left front stance, down block",
            "12. Step forward into right front stance, front punch",
            "13. Step forward into left front stance, front punch",
            "14. Step forward into right front stance, front punch",
            "15. Turn to face west into right front stance, down block",
            "16. Step forward into left front stance, front punch",
            "17. Turn to face east into left front stance, down block",
            "18. Step forward into right front stance, front punch",
            "19. Feet together to face north, left foot move to ready stance"
          ]
        }
      ]
    },
    weapons: {
      title: "Weapons",
      icon: "⚔️", 
      content: [
        {
          name: "Bo 1",
          videoLink: "https://vimeo.com/853565154?share=copy",
          description: "Basic staff form introducing fundamental bo staff techniques",
          difficulty: "Beginner",
          steps: [
            "Ready position: Staff held horizontally at waist level",
            "Basic striking patterns",
            "Fundamental blocks and thrusts",
            "Simple footwork coordination",
            "Form completion"
          ]
        }
      ]
    },
    combinations: {
      title: "Combinations",
      icon: "🥊",
      content: [
        {
          name: "Traditional Tae Kwon Do Combination Set",
          videoLink: "https://vimeo.com/844708084?share=copy",
          description: "Basic combination techniques for sparring practice",
          difficulty: "Beginner", 
          steps: [
            "1. Front punch, Front kick, back punch",
            "2. Front punch, Front kick, Round kick, back punch",
            "3. Front punch, Round kick, Side kick, back punch",
            "4. Front punch, Side kick, Round kick, back punch"
          ]
        },
        {
          name: "American Tae Kwon Do Combination Set",
          videoLink: "https://vimeo.com/844711948?share=copy",
          description: "American style combination techniques",
          difficulty: "Beginner",
          steps: [
            "1. Front punch, Front kick, Back leg round kick",
            "2. Front punch, Side kick, Back leg round kick",
            "3. Front punch, Round kick, Back fist, back punch",
            "4. Front punch, Side kick, Hook kick, back punch"
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
            <span className={css.levelBadge}>Level 1</span>
            Beginner Techniques
          </h1>
          <p className={css.levelDescription}>
            Master the fundamental forms, basic weapon techniques, and essential combinations
          </p>
        </div>
        <div className={css.progressIndicator}>
          <div className={css.progressBar}>
            <div className={css.progress} style={{width: '30%'}}></div>
          </div>
          <span className={css.progressText}>Beginner Level</span>
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
        <Link to="/" className={css.backButton}>
          ← Home
        </Link>
        <div className={css.levelNavigation}>
          <span className={css.currentLevel}>Level 1</span>
          <Link to="/level2" className={css.nextButton}>
            Next Level →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Level1;
