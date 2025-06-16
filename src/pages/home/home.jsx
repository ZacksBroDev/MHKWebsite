import React from "react";
import '/src/pages/home/home.css'
import { Link } from "react-router-dom";
import css from '/src/assets/css/style.module.css';

function Home() {
  return (
    <>
      <h1>Current Curriculum</h1>
      <table>
      <tbody>
        <tr>
          <th>Class Name</th>
          <th>Instructor</th>
          <th>Time</th>
          <th>Location</th>
        </tr>
        <tr>
          <td>Karate Basics</td>
          <td>Sensei John</td>
          <td>5:00 PM</td>
          <td>Room 101</td>
        </tr>
        <tr>
          <td>Advanced Karate</td>
          <td>Sensei Jane</td>
          <td>6:00 PM</td>
          <td>Room 102</td>
        </tr>
        <tr>
          <td>Kids Karate</td>
          <td>Sensei Mike</td>
          <td>4:00 PM</td>
          <td>Room 103</td>
        </tr>
        <tr>
          <td>Self-Defense</td>
          <td>Sensei Sarah</td>
          <td>7:00 PM</td>
          <td>Room 104</td>
        </tr>
        <tr>
          <td>Kickboxing</td>
          <td>Sensei Alex</td>
          <td>8:00 PM</td>
          <td>Room 105</td>
        </tr>
        <tr>
          <td>Weapons Training</td>
          <td>Sensei Tom</td>
          <td>9:00 PM</td>
          <td>Room 106</td>
        </tr>
        </tbody>
      </table>



      <div className="curriculum">
        <h1>Full Curriculum</h1>
        <h2>Under Belt</h2>
        <div className="level">
          <h3>Level 1</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Level1">Chon Ji Hyung</Link></li>
            <li><Link to="/Level1">Tan Gun Hyung</Link></li>
            <li><Link to="/Level1">To San Hynug</Link></li>
            <li><Link to="/Level1">Won Hyo Hyung</Link></li>
          </ul>
          <h4>Combos</h4>
          <ul>
            <li><Link to="/Level1">Karate Combination Set</Link></li>
            <li><Link to="/Level1">American Karate Combination Set</Link></li>
          </ul>
        </div>
        <div className="level">
          <h3>Level 2</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Level2">Yul Kuk</Link></li>
            <li><Link to="/Level2">Chun Gun</Link></li>
            <li><Link to="/Level2">Toi Gye</Link></li>
            <li><Link to="/Level2">Hwa Rang</Link></li>
            <li><Link to="/Level2">Karma 2</Link></li>
          </ul>
          <h4>Combos</h4>
          <ul>
            <li><Link to="/Level2">Tae Kwon Do Combination Set</Link></li>
            <li><Link to="/Level2">American Tae Kwon Do Combination Set</Link></li>
          </ul>
        </div>
        <div className="level">
          <h3>Level 3</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Level3">Chung Mu</Link></li>
            <li><Link to="/Level3">Po Eun</Link></li>
            <li><Link to="/Level3">Might For Right</Link></li>
            <li><Link to="/Level3">Bo 3</Link></li>
          </ul>
          <h4>Combos</h4>
          <ul>
            <li><Link to="/Level3">Kickboxing</Link></li>
            <li><Link to="/Level3">American Tae Kickboxing</Link></li>
          </ul>
        </div>
        <h2>Black Belt</h2>
        <div className="level">
          <h3>Conditional</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Conditionals">Bassai Dai</Link></li>
            <li><Link to="/Conditionals">Papohaku</Link></li>
            <li><Link to="/Conditionals">Beethoeven</Link></li>
          </ul>
        </div>
        <div className="level">
          <h3>1st Degree</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Deg1">Kwan Gye</Link></li>
            <li><Link to="/Deg1">Choon Jang</Link></li>
            <li><Link to="/Deg1">Koryo</Link></li>
            <li><Link to="/Deg1">The Beauty of Mexico</Link></li>
            <li><Link to="/Deg1">Sword 4</Link></li>
            <li><Link to="/Deg1">Kama 4</Link></li>
            <li><Link to="/Deg1">Bo 4</Link></li>
            <li><Link to="/Deg1">Nunchaku 4</Link></li>
            <li><Link to="/Deg1">Sword Basics</Link></li>
            <li><Link to="/Deg1">Kama Basics</Link></li>
            <li><Link to="/Deg1">Bo Basics</Link></li>
            <li><Link to="/Deg1">Nunchaku Basics</Link></li>
          </ul>
        </div>
        <div className="level">
          <h3>2nd Degree</h3>
          <h4>Forms</h4>
          <ul>
            <li><Link to="/Deg2">Sam II</Link></li>
            <li><Link to="/Deg2">Se Jong</Link></li>
            <li><Link to="/Deg2">Tong II</Link></li>
            <li><Link to="/Deg2">Yoo Shin</Link></li>
            <li><Link to="/Deg2">Choi Young</Link></li>
            <li><Link to="/Deg2">Ko Dang</Link></li>
            <li><Link to="/Deg2">UlJi</Link></li>
            <li><Link to="/Deg2">Twilight Zone</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Home;