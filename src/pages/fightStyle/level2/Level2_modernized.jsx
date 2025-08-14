/**
 * Level2 Component
 * 
 * Displays Level 2 martial arts curriculum with advanced forms and techniques.
 * Contains educational content with video links for intermediate-level training.
 * Part of the structured curriculum progression system.
 * 
 * @component
 * @returns {JSX.Element} Level 2 curriculum page
 * 
 * Content Includes:
 * - Dan-Gun and Do-San Hyung forms
 * - Bo staff techniques (Bo 2)
 * - Advanced combination sets
 * - Progressive difficulty from Level 1
 * - Navigation back to home page
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from '../../../assets/css/style.module.css';

/**
 * Level2 Component - Level 2 curriculum display
 * @returns {JSX.Element} Level 2 curriculum page with intermediate forms and techniques
 */
function Level2() {
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
            <span className={css.levelBadge}>Level 2</span>
            🥋 Level 2
          </h1>
          <p className={css.levelDescription}>
            Advance your skills with intermediate forms and combinations
          </p>
        </div>
        <div className={css.progressIndicator}>
          <div className={css.progressBar}>
            <div className={css.progress} style={{width: '60%'}}></div>
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
        {activeSection === 'forms' && (
          <>
            <div className={css.sectionTitle}>
              <h2>🥋 Forms</h2>
            </div>

            <div className={css.techniqueGrid}>
              {/* Yuk Kuk */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Yuk Kuk</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844708861?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'yukkuk' ? null : 'yukkuk')}
                    >
                      {expandedTechnique === 'yukkuk' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready Stance</p>
                
                {expandedTechnique === 'yukkuk' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Move left foot into horse stance north. Right hand aim.</li>
                      <li className={css.step}>2/3. Slow (2-3 sec) left punch. Right punch left punch</li>
                      <li className={css.step}>4. Skip right into horse stance. Slow (2-3 sec) right punch</li>
                      <li className={css.step}>5/6. left punch right punch</li>
                      <li className={css.step}>7. Step into right front stance northeast (or 45-degree angle) Right side block</li>
                      <li className={css.step}>8. Back leg front kick (left leg)</li>
                      <li className={css.step}>9/10. As land, front punch back punch</li>
                      <li className={css.step}>11. Shift into left front stance northwest (or 45-degree) left side block</li>
                      <li className={css.step}>12. back leg front kick (right leg)</li>
                      <li className={css.step}>13/14. Front punch back punch</li>
                      <li className={css.step}>15. shift right into north front stance, slow right chop (2-3 sec)</li>
                      <li className={css.step}>16. slow left chop (2-3 sec)</li>
                      <li className={css.step}>17. back (right) punch</li>
                      <li className={css.step}>18. step (left leg) forward into left front stance; Slow left chop (2-3 sec)</li>
                      <li className={css.step}>19. Slow right chop (2-3 sec)</li>
                      <li className={css.step}>20. Back punch (left)</li>
                      <li className={css.step}>21. Step (right leg) forward into right front stance. punch. Yell</li>
                      <li className={css.step}>22. Feet together (bring left to right-facing back door (east))</li>
                      <li className={css.step}>23. Left leg side kick</li>
                      <li className={css.step}>24. While landing in left front stance (north) right elbow strike into left palm</li>
                      <li className={css.step}>25. Feet together east (right to left)</li>
                      <li className={css.step}>26. Right side kick</li>
                      <li className={css.step}>27. While landing in right front stance (south) left elbow strike into right palm</li>
                      <li className={css.step}>28. Shift into right back stance (moving left foot) east. Open hand square block</li>
                      <li className={css.step}>29. Step into right front stance east. Right spear finger.</li>
                      <li className={css.step}>30. Shift clockwise (to right) into left back stance. Open square hand block</li>
                      <li className={css.step}>31. Step into left front stance west. Left hand spear finger.</li>
                      <li className={css.step}>32/33. Shift (left/counter clockwise) into left front stance south. Left outer block. Right punch</li>
                      <li className={css.step}>34/35. Step forward into right front stance south. Right outer block. Left punch</li>
                      <li className={css.step}>36. Move into left cross stance, right foot behind. Left leg south, left back fist. Yell</li>
                      <li className={css.step}>37. Shift (pivot) right (clockwise) into right front stance east, double forearm block</li>
                      <li className={css.step}>38. "skip" (right foot to left foot, then left foot) into left front stance west, double forearm block. Yell</li>
                      <li className={css.step}>End: Bring the left foot back to a ready position.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Chun Gun (Joong Gun) */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Chun Gun (Joong Gun)</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/838875858?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'chungun' ? null : 'chungun')}
                    >
                      {expandedTechnique === 'chungun' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready Posture: Closed Ready Stance (Feet together, left hand grabbing right fist below sternum)</p>
                
                {expandedTechnique === 'chungun' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Step into right back-stance west, left open-hand side block (or Left Middle Ridgehand Block), yell.</li>
                      <li className={css.step}>2. Left leg Front kick</li>
                      <li className={css.step}>3. land with left foot in front, Step into right foot in front Cat Stance, Right Upward Palm Heel Block (Shoulder level)</li>
                      <li className={css.step}>4. Pivot right on Left Foot into Left back-stance East, right open-hand side block (or right Middle Ridgehand Block)</li>
                      <li className={css.step}>5. Right leg Front kick</li>
                      <li className={css.step}>6. land with right foot in front, Step into left foot in front Cat Stance, left Upward Palm Heel Block (Shoulder level)</li>
                      <li className={css.step}>7. Shift to the left to face north into a Back Stance Sudo (left foot forward)</li>
                      <li className={css.step}>8. Shift into left foot front stance executing a Right Upper Elbow Strike (answer the phone)</li>
                      <li className={css.step}>9. Step into left back-stance sudo</li>
                      <li className={css.step}>10. Shift into right foot front stance executing a Left Upper Elbow Strike (answer the phone)</li>
                      <li className={css.step}>11. Step into left front stance while performing double punch: face level</li>
                      <li className={css.step}>12. Step into right foot front stance while executing a Twin Fist Uppercut (at about upper chest level) - YELL.</li>
                      <li className={css.step}>13. Shift into left front-stance south (turning to the left, moving only left foot) high closed hand x-block</li>
                      <li className={css.step}>14. Shift into right back-stance (facing east) left back fist</li>
                      <li className={css.step}>15/16. Shift into left front stance East, left inside block, right punch</li>
                      <li className={css.step}>17. Step Right into feet together facing south, then right into left back-stance facing west, right back fist.</li>
                      <li className={css.step}>18/19. Shift into Right front stance West, right inside block, left punch</li>
                      <li className={css.step}>20. Step feet together, right to left. (Bring the right foot to the left foot) double fist bump chamber. Step Left foot toward South (left) into a Left Front Stance south. Left Double Forearm High Block.</li>
                      <li className={css.step}>21. Shift into right back-stance south, left punch</li>
                      <li className={css.step}>22/23. Back leg side kick (right leg), (after kick, while chamber, chamber hands in double fist bump at left shoulder) land in right front stance, right double forearm block</li>
                      <li className={css.step}>24. Shift right leg into left back stance south while aim with left fist then right front punch</li>
                      <li className={css.step}>25/26. back leg (left) side kick still facing south, land in right back stance (left foot forward) with a closed hand sudo.</li>
                      <li className={css.step}>27. Shift into left front stance south, left hand low right hand high slow (2-3 sec) press block</li>
                      <li className={css.step}>28. Step into left back-stance, closed hand sudo</li>
                      <li className={css.step}>29. Shift into right front stance south, left hand low right hand high slow (2-3 sec) press block</li>
                      <li className={css.step}>30. Step feet together, left foot to right foot, shift to face east (to the left), same position as cross body punch (left hand chamber at ribs, right fist at left shoulder)</li>
                      <li className={css.step}>31. Step into left back-stance East, stick block (left hand high, right hand low - about chest level)</li>
                      <li className={css.step}>32. Skip (bring right foot to left foot, then left foot step) into right back-stance West, stick block. Yell.</li>
                      <li className={css.step}>End: Bring the left foot back to the ready position, feet together left hand grabbing right fist below sternum</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Toi Gye Hyung */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Toi Gye Hyung</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844706053?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'toigye' ? null : 'toigye')}
                    >
                      {expandedTechnique === 'toigye' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready stance Feet together. Left hand grabbing right fist at solar plexus (like around sternum)</p>
                
                {expandedTechnique === 'toigye' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Step left foot left into right back stance (west). Left side block. Yell</li>
                      <li className={css.step}>2. Shift into left front stance west. Left palm heel block across body at shoulder level, right spear hand to groin, palm up.</li>
                      <li className={css.step}>3. Feet together north, left foot to right foot. Cross left arm on top. Left down block, right outer block.</li>
                      <li className={css.step}>4. Step right into left back stance east. Right side block (left chamber at ribs)</li>
                      <li className={css.step}>5. Shift into right front stance east. Right palm heel block across body at shoulder level, left spear hand to groin, palm up.</li>
                      <li className={css.step}>6. Turn left feet together north, right to left. Cross right arm on top. Right down block, left outer block.</li>
                      <li className={css.step}>7/8. Step forward into left front stance north. Low closed hand X block. Double punch face level. Yell</li>
                      <li className={css.step}>9/10/11. Maintain hand position, back leg front kick(9) land right front stance north. Right front punch(10) left front punch (11)</li>
                      <li className={css.step}>12. Slowly feet together west, left foot to right foot. Hands move from a mountain block to fists on hip (Superman move)</li>
                      <li className={css.step}>13. Pivot left on left foot (move right foot) into horse stance south. Wide mountain block.</li>
                      <li className={css.step}>14. Pivot left on left foot (moving right foot to the left) into horse stance north. Wide mountain block.</li>
                      <li className={css.step}>15. Step feet together, right foot to left foot. Step into right back stance north. Low double forearm block</li>
                      <li className={css.step}>16/17. Shift into left front stance north. Reach and grab head triangle to right knee strike. Yell.</li>
                      <li className={css.step}>18. Land feet together west, step into right back stance south.</li>
                      <li className={css.step}>19/20. Maintain hand position, left front kick. Aim with right open hand palm down at eye level. Land left front stance south, left spear hand.</li>
                      <li className={css.step}>21. Step forward into left back stance south.</li>
                      <li className={css.step}>22. Maintain hand position. Right leg front kick. Aim with left open hand, palm down at eye level. Land right front stance south. Right spear hand.</li>
                      <li className={css.step}>23. Step back into right back stance south. Left down block south and high right hand back fist surfer.</li>
                      <li className={css.step}>24. Jump forward (south), land right cross stance east, but head facing south. Low closed hand X block east. Yell</li>
                      <li className={css.step}>25. Step into right front stance south. Double forearm block.</li>
                      <li className={css.step}>26. Pivot left on right foot into right back stance west. Low side block.</li>
                      <li className={css.step}>27. Shift into left front stance west. Right side block NW (45 degree angle)</li>
                      <li className={css.step}>28. Step feet together, step into left back stance east. Low side block.</li>
                      <li className={css.step}>29. Shift into right front stance east. Left side block NE (45 degree angle)</li>
                      <li className={css.step}>30. Pivot into left front stance north. Right side block NE (45 degree angle)</li>
                      <li className={css.step}>31. Pivot into right front stance east, left side block NE (45 degree angle)</li>
                      <li className={css.step}>32. Step into horse stance north. Right punch. Yell</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Hwa Rang Hyung */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Hwa Rang Hyung</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844710112?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'hwarang' ? null : 'hwarang')}
                    >
                      {expandedTechnique === 'hwarang' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready stance: Feet together (north), hands waist level, palms open, left hand on top</p>
                
                {expandedTechnique === 'hwarang' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Move left foot into horse stance, left open hand palm block at a 45 degree angle</li>
                      <li className={css.step}>2/3. Right punch, left punch</li>
                      <li className={css.step}>4. Shift right foot right into left back stance, closed hand square block</li>
                      <li className={css.step}>5. left hammer fist, palm up and right hand inner block, ending at right shoulder</li>
                      <li className={css.step}>6. Shift right foot forward into right fixed stance, right punch</li>
                      <li className={css.step}>7. Bring right foot to left, facing north (mirrors), right hand rainbow</li>
                      <li className={css.step}>8. Step the left foot east (toward back doors) into left front stance, left punch</li>
                      <li className={css.step}>9. Shift left foot to left (toward mirrors) into left front stance. Left down block</li>
                      <li className={css.step}>10. Step forward into right front stance, right punch</li>
                      <li className={css.step}>11. using hands to "pull" bring left foot to right foot, body facing north, feet facing west (front doors) set for side kick</li>
                      <li className={css.step}>12. Right side kick. After kick, chamber, then step into left back stance, right hand chop</li>
                      <li className={css.step}>13. Step left foot forward into left front stance, left punch</li>
                      <li className={css.step}>14. ddddkjbsadliuhgsdiuhsiugsfd ?????</li>
                      <li className={css.step}>15. Step the right foot toward D into a Right Walking Stance facing D, at the same time executing a Right Middle Punch to D.</li>
                      <li className={css.step}>16. Step the left foot toward E, turning counterclockwise to form a Right L-Stance (i.e., left foot forward) facing E. Middle Knifehand Guarding Block to E.</li>
                      <li className={css.step}>17. Step the right foot toward E into a Right Walking Stance facing E. Right Vertical Fingertip Thrust (spearhand) to E.</li>
                      <li className={css.step}>18. Move the right foot on line EF into a Right L-Stance (i.e., left foot forward) facing F. Middle Knifehand Guarding Block to F.</li>
                      <li className={css.step}>19. Perform 18 and 19 in a fast motion:</li>
                      <li className={css.step}>18. Execute a Right High Turning Kick to DF and then lower the right foot to F.</li>
                      <li className={css.step}>19. Execute a Left High Turning Kick to CF and then lower the left foot to F, into a Right L-Stance (i.e., left foot forward) facing F. Middle Knifehand Guarding Block to F.</li>
                      <li className={css.step}>20. Step the left foot toward C into a Left Walking Stance facing C. Left Low Block to C.</li>
                      <li className={css.step}>21. Execute a Right Middle Punch to C, pulling the right foot into a Right L-Stance (i.e., left foot forward) facing C.</li>
                      <li className={css.step}>22. Step the right foot toward C into a Left L-Stance (i.e., right foot forward) facing C. Left Middle Punch to C.</li>
                      <li className={css.step}>23. Step the left foot toward C into a Right L-Stance (i.e., left foot forward) facing C. Right Middle Punch to C.</li>
                      <li className={css.step}>24. Execute a X-Fist Pressing Block, pulling the left foot into a Left Walking Stance facing C, to C.</li>
                      <li className={css.step}>25. Step the right foot toward C in a, sliding motion forming a Right L-Stance (i.e., left foot forward) facing D. Right Elbow Thrust to C.</li>
                      <li className={css.step}>26. Bring the left foot to the right foot, turning counterclockwise to form a Closed Stance facing B. Right Inner Forearm Side Front Block, while extending the left forearm downard to the side.</li>
                      <li className={css.step}>27. Execute a Left Inner Forearm Side Front Block, extending the right forearm downward to the side, while maintaining a Closed Stance facing B.</li>
                      <li className={css.step}>28. Step the left foot toward B into a Right L-Stance (i.e., left foot forward) facing B at the same time executing a Middle Knifehand Guarding Block to B.</li>
                      <li className={css.step}>29. Bring the left foot to the right foot and then step the right foot toward A into a Left L-Stance (i.e., right foot forward) facing A. Middle Knifehand Guarding Block to A.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Kama 2 */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Kama 2</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/853554085?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'kama2' ? null : 'kama2')}
                    >
                      {expandedTechnique === 'kama2' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Ready position</p>
                
                {expandedTechnique === 'kama2' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Feet together, kamas chest level crossed. Left hand in front.</li>
                      <li className={css.step}>2. Move left foot left into horse stance north. Left hand inside chop. Down block. Right hand inside chop. Down block. Yell</li>
                      <li className={css.step}>3./4. Shift into left back stance east. Square block, left high block right outside block left hand inside chop. Down block. Move right foot into fixed stance. Right hand inside chop, down block.</li>
                      <li className={css.step}>5. Step forward into left front stance east, left hand inside chop, down block. Right inside chop, down block.</li>
                      <li className={css.step}>6. Shift (left foot left) into left front stance north. Left down block, right high block.</li>
                      <li className={css.step}>7. Step forward into right front stance north. Right chop at chest level, left high block. Chamber right hand on top left hand at hip. Step feet together left foot to right foot. Right hand chop.</li>
                      <li className={css.step}>8. </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeSection === 'combos' && (
          <>
            <div className={css.sectionTitle}>
              <h2>🥊 Combos</h2>
            </div>

            <div className={css.techniqueGrid}>
              {/* Tae Kwon Do Combination Set */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>Tae Kwon Do Combination Set</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844708084?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video 1-4
                    </a>
                    <a href="https://vimeo.com/844704841?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video 5-8
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'tkd-combo' ? null : 'tkd-combo')}
                    >
                      {expandedTechnique === 'tkd-combo' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>Traditional Tae Kwon Do combination set</p>
                
                {expandedTechnique === 'tkd-combo' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Front punch, Inside-outside kick, back punch.</li>
                      <li className={css.step}>2. Front punch, Lunge punch, Reverse hook kick, back punch.</li>
                      <li className={css.step}>3. Slide-in round kick high/low, Overhand back fist, Drop back punch.</li>
                      <li className={css.step}>4. Defensive side kick, Step behind Side kick, Back leg round kick, Back hand back fist, Back leg round kick.</li>
                      <li className={css.step}>5. Defensive side kick/ Slide-in hook kick/round kick, Overhand back fist, Mid-section back punch.</li>
                      <li className={css.step}>6. Jump round kick, Reverse back fist, Back leg round kick, back punch.</li>
                      <li className={css.step}>7. Slide-in round kick/side kick, Reverse side kick, Back leg round kick, back punch.</li>
                      <li className={css.step}>8. Slide-in hook kick, Back leg round kick, Reverse back fist, Back ridge hand.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* American Tae Kwon Do Combination Set */}
              <div className={css.techniqueCard}>
                <div className={css.cardHeader}>
                  <div className={css.techniqueInfo}>
                    <h3 className={css.techniqueName}>American Tae Kwon Do Combination Set</h3>
                    <span className={`${css.difficultyBadge} ${css.intermediate}`}>Intermediate</span>
                  </div>
                  <div className={css.cardActions}>
                    <a href="https://vimeo.com/844711948?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video 1-4
                    </a>
                    <a href="https://vimeo.com/844707769?share=copy" className={css.videoButton} target="_blank" rel="noopener noreferrer">
                      ▶️ Link to Video 5-8
                    </a>
                    <button
                      className={css.expandButton}
                      onClick={() => setExpandedTechnique(expandedTechnique === 'american-tkd-combo' ? null : 'american-tkd-combo')}
                    >
                      {expandedTechnique === 'american-tkd-combo' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>
                <p className={css.techniqueDescription}>American Tae Kwon Do combination set</p>
                
                {expandedTechnique === 'american-tkd-combo' && (
                  <div className={css.techniqueSteps}>
                    <ol className={css.stepsList}>
                      <li className={css.step}>1. Jump back leg round kick, Reverse hook kick, back punch.</li>
                      <li className={css.step}>2. Jump back leg side kick, Reverse side kick, back punch.</li>
                      <li className={css.step}>3. Front punch, Front kick, Back leg round kick, reverse hook/round kick, back punch.</li>
                      <li className={css.step}>4. Front punch/ridge hand, Reverse back fist, Back leg round kick, Back fist, back punch.</li>
                      <li className={css.step}>5. Lateral ridge hand, Hook kick, Back fist, Ridge hand.</li>
                      <li className={css.step}>6. Lateral round kick, Back fist, back punch, Ridge hand, Round kick.</li>
                      <li className={css.step}>7. Fade ridge hand, Hook kick, back punch.</li>
                      <li className={css.step}>8. Fade side kick, Hook kick/round kick, Front punch, back punch.</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Footer */}
      <div className={css.navigationFooter}>
        <Link to="/level1" className={css.backButton}>
          ← Level 1
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
