import React from "react";
import '/src/pages/home/home.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"; 

function Home() {
  return (
    <>
    <Router>
      <h1>Mile High Karate</h1>
      <div className="one">
        <header>
          <img src="/src/assets/img/logo.png" alt="Mile High Karate Logo" />
        </header>
      </div>
      <div className="two">
        <h1>hi</h1>
      </div>
      <div className="three">

      </div>
      </Router>
    </>
  );
}
export default Home;