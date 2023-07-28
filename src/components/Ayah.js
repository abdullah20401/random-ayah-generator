import React, { useState, useEffect } from "react";

import twitterIcon from "../twitter.svg";

const Ayah = () => {
  const [ayah, setAyah] = useState();
  const [ayahNumber, setAyahNumber] = useState();
  const [surahTranslation, setSurahTranslation] = useState();
  const [surahDetails, setSurahDetails] = useState([[], [], [], []]);

  useEffect(() => {
    return getAyah();
  }, []);

  const getAyah = () => {
    let randomNum = Math.floor(Math.random() * 6236);
    let url = `http://api.alquran.cloud/v1/ayah/${randomNum}/editions/quran-uthmani,en.sahih`;

    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        setAyah(data[0].text);
        setAyahNumber(data[0].numberInSurah);

        setSurahTranslation(data[1].text);

        setSurahDetails([
          [data[0].surah.number],
          [data[0].surah.name],
          [data[0].surah.englishName],
          [data[0].surah.englishNameTranslation],
        ]);
      });
  };
  return (
    <div id="ayah-box">
      <div id="text">
        <p>{ayah}</p>
      </div>
      <div id="ayah-translation">
        <h4>
          <b>
            <div id="translation-text">{surahTranslation}</div>
          </b>
        </h4>
      </div>

      <div id="ayah-number">
        <p>{`${surahDetails[0]}:${ayahNumber}`}</p>
      </div>

      <div id="surah-details">
        <p>{`${surahDetails[1]} - Surah ${surahDetails[2]} (${surahDetails[3]})`}</p>
      </div>

      <div id="buttons">
        <div className="social-media">
          <a href="https://twitter.com" id="tweet-ayah">
            <span>
              <img src={twitterIcon} alt="" />
            </span>
          </a>
        </div>

        <button id="new-ayah" onClick={() => getAyah}>
          New Ayah
        </button>
      </div>
    </div>
  );
};

export default Ayah;
