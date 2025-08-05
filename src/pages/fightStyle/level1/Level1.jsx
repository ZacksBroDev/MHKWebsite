import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../assets/css/style.module.css';

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
          videoLink: "https://vimeo.com/838866958?share=copy",
          description: "Ready stance",
          difficulty: "Beginner",
          steps: [
            "1. Step left foot to the left (west) front stance down block, Yell",
            "2. Left fist aim, right foot step forward into right front stance, front punch (right hand)",
            "3. Swing right foot into right front stance east, right down block",
            "4. Right fist aim, left foot, step forward into left front stance east, front punch (left hand)",
            "5. Shift into left front stand north, left down block",
            "6. Left fist aim, right foot, step forward into Right front stance, front punch (right hand)",
            "7. Swing right foot into right front stance South, right down block",
            "8. Right fist aim, left foot, step forward into left front stance east, front punch (left hand). Yell",
            "9. Swinging left foot left, shift into right back stance east, left side block.",
            "10. Left fist aim, right foot step forward into Right front stance, front punch (right hand)",
            "11. Swing right foot into left back stance west, right side block",
            "12. Right fist aim, left foot step forward into Left front stance, front punch (left hand)",
            "13. Swing left foot into right back stance South, left side block",
            "14. Left fist aim, Right foot step forward into right front stance, front punch (right hand)",
            "15. Swing right foot into left back stance North, right side block",
            "16. Right fist aim, left foot step forward into Left front stance, front punch (left hand)",
            "17. Right foot step into right front stance, right front punch",
            "18. Right step back into left front stance, left front punch."
          ]
        },
        {
          name: "Tan-Gun Hyung",
          videoLink: "https://vimeo.com/838866763?share=copy",
          description: "Ready Stance",
          difficulty: "Beginner",
          steps: [
            "1. Swing left foot left, stepping into right back stance west, Sudo. Yell",
            "2. Left fist aim (eye level) Right foot step forward into right front stance west, right front punch (eye level)",
            "3. Swing right foot right, stepping into left back stance east Sudo.",
            "4. Right fist aim (eye level) Left foot step forward into left front stance east, left front punch (eye level)",
            "5. Swing left foot left into left front stance north, left down block",
            "6. Right foot step forward into right front stance north, right front punch (eye level)",
            "7. Left foot step forward into left front stance north, left front punch (eye level)",
            "8. Right foot step forward into right front stance north, right front punch (eye level) Yell",
            "9. Swinging left foot left, pivot left (C-step) into right back stance East, closed hand square block",
            "10. Left fist aim (eye level) Right foot step forward into right front stance East, right front punch (eye level)",
            "11. Swinging right foot right, pivot right into left back stance West, closed hand square block",
            "12. Right fist aim (eye level) Left foot step forward into left front stance West, left front punch (eye level)",
            "13/14. Swinging left foot left, shift into left front stance South, left down block, left high block",
            "15. Right foot step forward into right front stance south, right high block",
            "16. left foot step forward into left front stance south, left high block",
            "17. Right foot step forward into right front stance south, right high block",
            "18. Swinging left foot left, shift into right back stance West, (chamber cross chest, left hand on top) left chop",
            "19. Left fist aim (eye level) Right foot step forward into right front stance West, right front punch (eye level)",
            "20. Swing right foot right into right back stance east, (chamber: cross right arm on top) right chop",
            "21. left fist aim (eye level) right foot step forward into right front stance East, left front punch (eye level) Yell"
          ]
        },
        {
          name: "To-San Hyung",
          videoLink: "https://vimeo.com/838866814?share=copy",
          description: "Ready position (Feet should width apart, arms tense (tight muscles) fists bellybutton)",
          difficulty: "Beginner",
          steps: [
            "1./2. Step into left front stance west (to the left). Left outer block. Right punch. Yell",
            "3./4. Move left foot north. Move right foot south (left foot moves right, right foot moves left). Pivot into right front stance east (turning to the right 180*). Right outer block, left punch.",
            "5. Shift into right back stance north. Sudo.",
            "6. Step forward into right front stance. Right spear finger. Yell",
            "7. Pivot to the left on right foot into a left front stance. Left back fist",
            "8. Step forward into right front stance. Right back fist.",
            "9./10 Pivot to the left on right foot (c-step) into left front stance east. Left Outerblock. Right punch.",
            "11./12 Move left foot south. Move right foot north (left foot moves right, right foot moves left). Pivot into left front stance west (turning to the right 180*). Right outer block left punch",
            "13. Pivot (left) into left front stance at 45* angle, cross arms at chest (left over right). Double outer block.",
            "14. Back leg front kick (right front kick). Land in right front stance",
            "15./16 Front punch back punch. (right, left)",
            "17. Shift (moving right leg) into right front stance SW or 45 degree angle. Cross arms at chest (right over left). Double outer block.",
            "18. Back leg (left) front kick. Left in left front stance.",
            "19./20 Front (left) punch. Back (right) punch.",
            "21. Shift (left) into left front stance south. Left high block.",
            "22. Step forward into right front stance south. Right high block",
            "23. Pivot left on right foot into horse stance north. Cross left arm on top. Chop.",
            "24. Step feet together (left to right). Step out (right) into horse stance north. Cross right arm on top. Chop. Yell."
          ]
        },
        {
          name: "Won-Hyo Hyung",
          videoLink: "https://vimeo.com/838866896?share=copy",
          description: "Ready stance (Feet together. Left hand grabbing right fist at chin level)",
          difficulty: "Beginner",
          steps: [
            "1. Step (left) into right back stance west. Closed hand square block. Yell",
            "2. Right chop and left inner block (left fist ends at right shoulder)",
            "3. Move left foot forward into fixed stance west. Aim with right fist then Left punch.",
            "4. Step feet together (left to right) then step (right) into left back stance east. Closed square block.",
            "5. Left chop and right inner block (right fist ends at left shoulder)",
            "6. Move right foot forward into fixed stance east. Aim with left fist then right punch.",
            "7. Feet together (right to left foot)",
            "8./9. Left leg sidekick north. Land in right back stance sudo",
            "10. Step forward into left back stance sudo",
            "11. Step forward into right back stance sudo",
            "12. Step forward into right front stance. Right spear finger. Yell",
            "13. Pivot left (counterclockwise) on right foot (c-step) into right back stance closed hand square block.",
            "14. Right chop and left inner block (left fist ends at right shoulder)",
            "15. Move left foot forward into fixed stance East. Aim with right fist then Left punch.",
            "16. Step feet together (left to right). Step right into left back stance closed hand square block.",
            "17. Left chop and right inner block (right fist ends at left shoulder)",
            "18. Move right foot forward into fixed stance west. Aim with left fist then right punch.",
            "19. Bring right foot to left. Step left into left front stance south. Right circle block.",
            "20./21 Back leg (right) front kick. Land right front stance south. Left punch.",
            "22. Keeping feet where they are, left circle block.",
            "23./24 Back leg (left) front kick. Land in left front stance south. Right punch.",
            "25. Feet together, right to left (facing east)",
            "26. Right leg side kick south. Land right foot directly next to left foot.",
            "27. Pivot on right foot (turning left) bringing left foot into right back stance west closed hand sudo.",
            "28. Step feet together (left to right). Then stepping right foot into left back stance east. Closed hand sudo. Yell."
          ]
        }
      ]
    },
    weapons: {
      title: "Weapons",
      icon: "⚔️",
      content: [
        {
          name: "Kama 1",
          videoLink: "https://vimeo.com/844692127?share=copy",
          description: "Ready stance (feet shoulder width. Kamas crossed at waist level, right hand on top)",
          difficulty: "Beginner",
          steps: [
            "1. Step left (90*) into left front stance left. Left down block. Right high block. Yell",
            "2. Step forward (right foot forward) into right front stance west. Right chop at chest level, left high block.",
            "3. Pivot right on left foot into right front stance east. Right down block. Left high block.",
            "4. Step forward (left foot forward) into left front stance east. Left chop at chest level, right high block.",
            "5. Shift (moving left foot left) into front stance north. Left down block. Right high block.",
            "6. Step left foot forward into left front stance north. Right chop chest level. Left high block.",
            "7. Pivot to the right on left foot into right front stance south. Right down block. Left high block.",
            "8. Step forward (left foot forward) into left front stance south. Left chop at chest level, right high block. Yell",
            "9. Shift (left foot to the left) into right back stance east. Square block. Right hand on top",
            "10. Step right foot forward into right front stance east. Right chop at chest level left high block",
            "11. Pivot right on left foot into left back stance west. Square block. Left hand on top",
            "12. Step forward (left foot forward) into left front stance west. Left chop at chest level, right high block.",
            "13. Shift (left foot to the left) into right back stance south. Square block. Right hand on top",
            "14. Step right foot forward into right front stance south. Right chop at chest level left high block",
            "15. Pivot right on left foot into left back stance north. Square block. Left hand on top",
            "16. Step forward (left foot forward) into left front stance north. Left chop at chest level, right high block.",
            "17. Step forward (right foot forward) into right front stance north. Right chop at chest level, left high block",
            "18. Step back (right foot backward) into left front stance north. Left chop at chest level, right high block.",
            "19. Left step back into right front stance, right front punch. Yell"
          ]
        }
      ]
    },
    combinations: {
      title: "Combinations",
      icon: "🥊",
      content: [
        {
          name: "Karate Combination Set",
          videoLink: "https://vimeo.com/853551821?share=copy",
          videoLink2: "https://vimeo.com/844088253?share=copy",
          description: "Traditional Karate combinations",
          difficulty: "Beginner",
          steps: [
            "1. Front punch, back punch.",
            "2. Front punch, Front kick, back punch.",
            "3. Back fist, Step behind Side kick, back punch.",
            "4. Front punch, Back leg front kick, Reverse sidekick, back punch.",
            "5. Front punch, back punch, Ridge hand.",
            "6. Front punch, Front kick, Sidekick, back punch.",
            "7. Front punch, Round kick, Side kick, back punch.",
            "8. Front Punch, back punch, Back leg round kick, Reverse side kick, back punch."
          ]
        },
        {
          name: "American Karate Combination Set",
          videoLink: "https://vimeo.com/844692582?share=copy",
          videoLink2: "https://vimeo.com/844693036?share=copy",
          description: "American Karate combinations",
          difficulty: "Beginner",
          steps: [
            "1. Back fist, Hook kick, back punch.",
            "2. Slide-in Sidekick/ Sidekick, back punch, Back leg round kick, Reverse back fist, Back ridge hand.",
            "3. Back fist, Hook kick, Back leg round kick, Reverse side kick, back punch.",
            "4. Front punch, back punch, Back leg front kick (low)/round kick (high), Reverse sidekick, Back ridge hand.",
            "5. Palm, Fade, Switch palm.",
            "6. Jam/jam, Palm, Switch round kick cover, Switch palm, Grab, Back leg round kick.",
            "7. Palm, Fade, Switch round kick cover, Step forward jam, Palm.",
            "8. Back hand parry, Front hand parry, Palm, Switch round kick cover/round kick cover, Step forward jam, Palm."
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
              🥋 Level 1
              <span className={css.levelBadge}>Beginner</span>
            </h1>
            <p className={css.levelDescription}>
              Master fundamental forms, basic weapon techniques, and essential combinations
            </p>
          </div>
          <div className={css.progressIndicator}>
            <div className={css.progressBar}>
              <div className={css.progress} style={{width: '25%'}}></div>
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
                      ▶️ Video 1-4
                    </a>
                    {technique.videoLink2 && (
                      <a 
                        href={technique.videoLink2} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={css.videoButton}
                      >
                        ▶️ Video 5-8
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
    </>
  );
}

export default Level1;
