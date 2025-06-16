import React from "react";
import { Link } from "react-router-dom";
import css from '/src/assets/css/style.module.css';

function Deg1() {
  return (
    <>
      <div className={css.curriculum}>
        <h1>1st Degree</h1>
        <h2>Forms</h2>
        <div className={css.level}>
          <h2>Kwan Gye</h2>
          <h3><a href="https://vimeo.com/841089467">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Choon Jang</h2>
          <h3><a href="https://vimeo.com/838149364?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Koryo</h2>
          <h3><a href="https://vimeo.com/840308661?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Gye Beak</h2>
          <h3><a href="https://vimeo.com/838153999?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>The Beauty of Mexico</h2>
          <h3><a href="https://vimeo.com/891286260?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Sword IV</h2>
          <h3><a href="https://vimeo.com/841070541?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Kama IV</h2>
          <h3><a href="https://vimeo.com/840314893?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Bo IV</h2>
          <h3><a href="https://vimeo.com/840311445?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Nunchaku IV</h2>
          <h3><a href="https://vimeo.com/841073460?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Sword Basics</h2>
          <h3><a href="https://vimeo.com/844064289">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Kama Basics</h2>
          <h3><a href="https://vimeo.com/844066219?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Bo Basics</h2>
          <h3><a href="https://vimeo.com/840313923?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Nunchaku Basics</h2>
          <h3><a href="https://vimeo.com/841073460?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <Link to="/"><button>Home</button></Link>
      </div>
    </>
  );
}
export default Deg1;