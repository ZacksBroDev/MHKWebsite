import React from "react";
import '/src/pages/home/home.css'
import css from '/src/assets/css/style.module.css';

function Home() {
  return (
    <>
      <h1>Current Curriculum</h1>
      <table>
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
      </table>
    </>
  );
}
export default Home;