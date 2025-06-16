import React from "react";
import { Link } from "react-router-dom";

function Conditional() {
  return (
    <>
      <div className="curriculum">
        <h1>Conditional</h1>
        <h2>Forms</h2>
        <div className="level">
          <h2>Bassai Dai</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Papohaku Sho</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Beethoeven</h2>
          <h3>Link to Video</h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <Link to="/"><button>Home</button></Link>
      </div>
    </>
  );
}
export default Conditional;