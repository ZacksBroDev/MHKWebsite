import React from "react";
import '/src/pages/home/home.css'

function Home() {
  return (
    <>
      <h1 className="home">Home</h1>
      <p>Welcome to the Martial Arts Classes at Mile High Karate!</p>
      <p>We offer a variety of classes for all ages and skill levels.</p>
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
      </table>
    </>
  );
}
export default Home;