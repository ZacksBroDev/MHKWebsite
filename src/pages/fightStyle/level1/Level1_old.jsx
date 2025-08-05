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
      icon: "🥋",
      content: [
        {
          name: "Chon Ji Hyung",
          videoLink: "https://vimeo.com/844709319?share=copy",
          description: "Heaven and Earth - the fundamental beginning form",
          difficulty: "Beginner",
          steps: [
            "Ready stance",
            "1. Left foot into left front stance, down block",
            "2. Step forward into right front stance, front punch",
            "3. Turn to face west into right front stance, down block",
            "4. Step forward into left front stance, front punch",
            "5. Turn to face north into left front stance, down block",
            "6. Step forward into right front stance, front punch",
            "7. Step forward into left front stance, front punch",
            "8. Step forward into right front stance, front punch. Yell",
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
    <>
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
    <div>
      <h1>Level 1</h1>
      <h2>Forms</h2>
      <div className={css.level}>
        <h2>Chon Ji Hyung</h2>
        <h3><a href="https://vimeo.com/838866958?share=copy">Link to Video</a></h3>
        <p>Ready stance</p>
        <ul>
          <li>1. Step left foot to the left (west) front stance down block, Yell</li>
          <li>2. Left fist aim, right foot step forward into right front stance, front punch (right hand)</li>
          <li>3. Swing right foot into right front stance east, right down block</li>
          <li>4. Right fist aim, left foot, step forward into left front stance east, front punch (left hand) </li>
          <li>5. Shift into left front stand north, left down block</li>
          <li>6. Left fist aim, right foot, step forward into Right front stance, front punch (right hand) </li>
          <li>7. Swing right foot into right front stance South, right down block</li>
          <li>8. Right fist aim, left foot, step forward into left front stance east, front punch (left hand). Yell</li>
          <li>9. Swinging left foot left, shift into right back stance east, left side block.</li>
          <li>10. Left fist aim, right foot step forward into Right front stance, front punch (right hand) </li>
          <li>11. Swing right foot into left back stance west, right side block</li>
          <li>12. Right fist aim, left foot step forward into Left front stance, front punch (left hand) </li>
          <li>13. Swing left foot into right back stance South, left side block</li>
          <li>14. Left fist aim, Right foot step forward into right front stance, front punch (right hand) </li>
          <li>15. Swing right foot into left back stance North, right side block</li>
          <li>16. Right fist aim, left foot step forward into Left front stance, front punch (left hand) </li>
          <li>17. Right foot step into right front stance, right front punch</li>
          <li>18. Right step back into left front stance, left front punch.</li>
        </ul>
      </div>
      <div className={css.level}>
        <h2>Kama 1</h2>
        <h3><a href="https://vimeo.com/844692127?share=copy">Link to Video</a></h3>
        <p>Ready stance (feet shoulder width. Kamas crossed at waist level, right hand on top)</p>
        <ul>
          <li>1. Step left (90*) into left front stance left. Left down block. Right high block. Yell</li>
          <li>2. Step forward (right foot forward) into right front stance west. Right chop at chest level, left high block.</li>
          <li>3. Pivot right on left foot into right front stance east. Right down block. Left high block.</li>
          <li>4. Step forward (left foot forward) into left front stance east. Left chop at chest level, right high block.</li>
          <li>5. Shift (moving left foot left) into front stance north. Left down block. Right high block.</li>
          <li>6. Step left foot forward into left front stance north. Right chop chest level. Left high block.</li>
          <li>7. Pivot to the right on left foot into right front stance south. Right down block. Left high block.</li>
          <li>8. Step forward (left foot forward) into left front stance south. Left chop at chest level, right high block. Yell</li>
          <li>9. Shift (left foot to the left) into right back stance east. Square block. Right hand on top</li>
          <li>10. Step right foot forward into right front stance east. Right chop at chest level left high block</li>
          <li>11. Pivot right on left foot into left back stance west. Square block. Left hand on top</li>
          <li>12. Step forward (left foot forward) into left front stance west. Left chop at chest level, right high block.</li>
          <li>13. Shift (left foot to the left) into right back stance south. Square block. Right hand on top</li>
          <li>14. Step right foot forward into right front stance south. Right chop at chest level left high block</li>
          <li>15. Pivot right on left foot into left back stance north. Square block. Left hand on top</li>
          <li>16. Step forward (left foot forward) into left front stance north. Left chop at chest level, right high block.</li>
          <li>17. Step forward (right foot forward) into right front stance north. Right chop at chest level, left high block</li>
          <li>18. Step back (right foot backward) into left front stance north. Left chop at chest level, right high block.</li>
          <li>19. Left step back into right front stance, right front punch. Yell</li>
        </ul>
      </div>
      <div className={css.level}>
        <h2>Tan-Gun Hyung</h2>
        <h3><a href="https://vimeo.com/838866763?share=copy">Link to Video</a></h3>
        <p>Ready Stance</p>
        <ul>
          <li>1. Swing left foot left, stepping into right back stance west, Sudo. Yell</li>
          <li>2. Left fist aim (eye level) Right foot step forward into right front stance west, right front punch (eye level)</li>
          <li>3. Swing right foot right, stepping into left back stance east Sudo.</li>
          <li>4. Right fist aim (eye level) Left foot step forward into left front stance east, left front punch (eye level)</li>
          <li>5. Swing left foot left into left front stance north, left down block</li>
          <li>6. Right foot step forward into right front stance north, right front punch (eye level)</li>
          <li>7. Left foot step forward into left front stance north, left front punch (eye level)</li>
          <li>8. Right foot step forward into right front stance north, right front punch (eye level) Yell</li>
          <li>9. Swinging left foot left, pivot left (C-step) into right back stance East, closed hand square block</li>
          <li>10. Left fist aim (eye level) Right foot step forward into right front stance East, right front punch (eye level)</li>
          <li>11. Swinging right foot right, pivot right into left back stance West, closed hand square block</li>
          <li>12. Right fist aim (eye level) Left foot step forward into left front stance West, left front punch (eye level)</li>
          <li>13/14. Swinging left foot left, shift into left front stance South, left down block, left high block</li>
          <li>15. Right foot step forward into right front stance south, right high block</li>
          <li>16. left foot step forward into left front stance south, left high block</li>
          <li>17. Right foot step forward into right front stance south, right high block</li>
          <li>18. Swinging left foot left, shift into right back stance West, (chamber cross chest, left hand on top) left chop</li>
          <li>19. Left fist aim (eye level) Right foot step forward into right front stance West, right front punch (eye level)</li>
          <li>20. Swing right foot right into right back stance east, (chamber: cross right arm on top) right chop</li>
          <li>21. left fist aim (eye level) right foot step forward into right front stance East, left front punch (eye level) Yell</li>
        </ul>
      </div>
      <div className={css.level}>
        <h2>To-San Hyung</h2>
        <h3><a href="https://vimeo.com/838866814?share=copy">Link to Video</a></h3>
        <p>Ready position (Feet should width apart, arms tense (tight muscles) fists bellybutton)</p>
        <ul>
          <li>1./2. Step into left front stance west (to the left). Left outer block. Right punch. Yell</li>
          <li>3./4. Move left foot north. Move right foot south (left foot moves right, right foot moves left). Pivot into right front stance east (turning to the right 180*). Right outer block, left punch.</li>
          <li>5. Shift into right back stance north. Sudo.</li>
          <li>6. Step forward into right front stance. Right spear finger. Yell</li>
          <li>7. Pivot to the left on right foot into a left front stance. Left back fist</li>
          <li>8. Step forward into right front stance. Right back fist.</li>
          <li>9./10 Pivot to the left on right foot (c-step) into left front stance east. Left Outerblock. Right punch.</li>
          <li>11./12 Move left foot south. Move right foot north (left foot moves right, right foot moves left). Pivot into left front stance west (turning to the right 180*). Right outer block left punch</li>
          <li>13. Pivot (left) into left front stance at 45* angle, cross arms at chest (left over right). Double outer block.</li>
          <li>14. Back leg front kick (right front kick). Land in right front stance</li>
          <li>15./16 Front punch back punch. (right, left)</li>
          <li>17. Shift (moving right leg) into right front stance SW or 45 degree angle. Cross arms at chest (right over left). Double outer block.</li>
          <li>18. Back leg (left) front kick. Left in left front stance.</li>
          <li>19./20 Front (left) punch. Back (right) punch.</li>
          <li>21. Shift (left) into left front stance south. Left high block.</li>
          <li>22. Step forward into right front stance south. Right high block</li>
          <li>23. Pivot left on right foot into horse stance north. Cross left arm on top. Chop.</li>
          <li>24. Step feet together (left to right). Step out (right) into horse stance north. Cross right arm on top. Chop. Yell.</li>
        </ul>
      </div>
      <div className={css.level}>
        <h2>Won-Hyo Hyung</h2>
        <h3><a href="https://vimeo.com/838866896?share=copy">Link to Video</a></h3>
        <p>Ready stance (Feet together. Left hand grabbing right fist at chin level)</p>
        <ul>
          <li>1. Step (left) into right back stance west. Closed hand square block. Yell</li>
          <li>2. Right chop and left inner block (left fist ends at right shoulder)</li>
          <li>3. Move left foot forward into fixed stance west. Aim with right fist then Left punch.</li>
          <li>4. Step feet together (left to right) then step (right) into left back stance east. Closed square block.</li>
          <li>5. Left chop and right inner block (right fist ends at left shoulder)</li>
          <li>6. Move right foot forward into fixed stance east. Aim with left fist then right punch.</li>
          <li>7. Feet together (right to left foot)</li>
          <li>8./9. Left leg sidekick north. Land in right back stance sudo</li>
          <li>10. Step forward into left back stance sudo</li>
          <li>11. Step forward into right back stance sudo</li>
          <li>12. Step forward into right front stance. Right spear finger. Yell</li>
          <li>13. Pivot left (counterclockwise) on right foot (c-step) into right back stance closed hand square block.</li>
          <li>14. Right chop and left inner block (left fist ends at right shoulder)</li>
          <li>15. Move left foot forward into fixed stance East. Aim with right fist then Left punch.</li>
          <li>16. Step feet together (left to right). Step right into left back stance closed hand square block.</li>
          <li>17. Left chop and right inner block (right fist ends at left shoulder)</li>
          <li>18. Move right foot forward into fixed stance west. Aim with left fist then right punch.</li>
          <li>19. Bring right foot to left. Step left into left front stance south. Right circle block.</li>
          <li>20./21 Back leg (right) front kick. Land right front stance south. Left punch.</li>
          <li>22. Keeping feet where they are, left circle block.</li>
          <li>23./24 Back leg (left) front kick. Land in left front stance south. Right punch.</li>
          <li>25. Feet together, right to left (facing east)</li>
          <li>26. Right leg side kick south. Land right foot directly next to left foot.</li>
          <li>27. Pivot on right foot (turning left) bringing left foot into right back stance west closed hand sudo.</li>
          <li>28. Step feet together (left to right). Then stepping right foot into left back stance east. Closed hand sudo. Yell.</li>
        </ul>
      </div>
      <h2>Combos</h2>
      <div className={css.level}>
        <h2>Karate Combination Set</h2>
        <h3><a href="https://vimeo.com/853551821?share=copy">Link to Video 1-4</a></h3>
        <h3><a href="https://vimeo.com/844088253?share=copy">Link to Video 5-8</a></h3>
        <ul>
          <li>1. Front punch, back punch.</li>
          <li>2. Front punch, Front kick, back punch.</li>
          <li>3. Back fist, Step behind Side kick, back punch.</li>
          <li>4. Front punch, Back leg front kick, Reverse sidekick, back punch.</li>
          <li>5. Front punch, back punch, Ridge hand.</li>
          <li>6. Front punch, Front kick, Sidekick, back punch.</li>
          <li>7. Front punch, Round kick, Side kick, back punch.</li>
          <li>8. Front Punch, back punch, Back leg round kick, Reverse side kick, back punch.</li>
        </ul>
      </div>
      <div className={css.level}>
        <h2>American Karate Combination Set</h2>
        <h3><a href="https://vimeo.com/844692582?share=copy">Link to Video 1-4</a></h3>
        <h3><a href="https://vimeo.com/844693036?share=copy">Link to Video 5-8</a></h3>
        <ul>
          <li>1. Back fist, Hook kick, back punch.</li>
          <li>2. Slide-in Sidekick/ Sidekick, back punch, Back leg round kick, Reverse back fist, Back ridge hand.</li>
          <li>3. Back fist, Hook kick, Back leg round kick, Reverse side kick, back punch.</li>
          <li>4. Front punch, back punch, Back leg front kick (low)/round kick (high), Reverse sidekick, Back ridge hand.</li>
          <li>5. Palm, Fade, Switch palm.</li>
          <li>6. Jam/jam, Palm, Switch round kick cover, Switch palm, Grab, Back leg round kick.</li>
          <li>7. Palm, Fade, Switch round kick cover, Step forward jam, Palm.</li>
          <li>8. Back hand parry, Front hand parry, Palm, Switch round kick cover/round kick cover, Step forward jam, Palm.</li>
        </ul>
      </div>
      <Link to="/"><button>Home</button></Link>
    </div>
  </>
  );
}
export default Level1;