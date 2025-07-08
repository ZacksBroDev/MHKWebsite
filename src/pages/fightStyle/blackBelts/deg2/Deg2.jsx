import React from "react";
import { Link } from "react-router-dom";
import css from '../../../../assets/css/style.module.css';

function Deg2() {
  return (
    <>
      <div className={css.curriculum}>
        <h1>2st Degree</h1>
        <h2>Forms</h2>
        <div className={css.level}>
          <h2>Sam II</h2>
          <h3><a href="https://vimeo.com/838146060?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Se Jong</h2>
          <h3><a href="https://vimeo.com/838147630?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Tong II</h2>
          <h3><a href="https://vimeo.com/838108152?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Yoo Shin</h2>
          <h3><a href="https://vimeo.com/838125909?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Choi Young</h2>
          <h3><a href="https://vimeo.com/838112046?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Ko Dang</h2>
          <h3><a href="https://vimeo.com/840310220?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>UlJi</h2>
          <h3><a href="https://vimeo.com/838140039?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <div className={css.level}>
          <h2>Twilight Zone</h2>
          <h3><a href="https://vimeo.com/891285855?share=copy">Link to Video</a></h3>
          <ul>
            <li>1</li>
          </ul>
        </div>
        <Link to="/"><button>Home</button></Link>
      </div>
    </>
  );
}
export default Deg2;