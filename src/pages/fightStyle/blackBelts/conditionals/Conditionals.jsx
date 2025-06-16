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
          <h3><a href="https://vimeo.com/891288935?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Papohaku Sho</h2>
          <h3><a href="https://vimeo.com/891286068?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
          <h2>Beethoven</h2>
          <h3><a href="https://vimeo.com/891293935?share=copy">Link to Video</a></h3>
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