import React from "react";
import { Link } from "react-router-dom";

function Level3() {
  return (
    <>
      <div className="curriculum">
        <h1>Level 3</h1>
        <h2>Forms</h2>
        <div className="level">
          <h2>Chung Mu</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Po Eun</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Might For Right</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Bo 3</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h1>Combos</h1>
          <h2>Kickboxing Combination Set</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1. Reverse hook kick/round kick, back punch, Back leg round kick/side kick, back punch.</li>
            <li>2. Inside-outside kick, Lunge punch, Reverse hook kick/round kick/side kick, back punch.</li>
            <li>3. Front punch, Hook kick/round kick, Reverse side kick, Reverse back fist, back punch.</li>
            <li>4. 360° Round kick, Reverse hook kick, Back leg round kick, Back ridge hand.</li>
          </ul>
          <h2>American Kickboxing Combination Set - (Offensive only)</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1. Jab/hook.</li>
            <li>2. Uppercut, Hook.</li>
            <li>3. Jab, Cross, Hook.</li>
            <li>4. Jab/Hook, spin back fist. (all the way through resetting with back leg)</li>
            <li>5. Thrust front kick, Uppercut, Hook.</li>
            <li>6. Jab, Cross, Front Round Kick (no hip extension), Back Round Kick. (no hip extension)</li>
            <li>7. Jab, Front kick, Cross, Front round kick. (no hip extension)</li>
            <li>8. Hook, Cross, Back round kick (no hip extension).</li>
            <li>9. Jab, Bump Front leg ax kick, Full back leg round kick.(Spin though to turn)</li>
            <li>10. Jab, Cross, Back leg outside to inside crescent kick, Ridge hand.</li>
            <li>11. Back leg round kick, Tornado kick, Reverse Hook kick.</li>
            <li>12. Jump back leg front kick/ Back leg Round Kick, Reverse Hook Kick, Back fist, Cross.</li>
            <li>13. Jump back leg round kick/ back round kick, Reverse Hook Kick.</li>
          </ul>
        </div>
        <Link to="/"><button>Home</button></Link>
      </div>
    </>
  );
}
export default Level3;